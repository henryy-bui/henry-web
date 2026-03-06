---
title: "Building a Distributed Cache from Scratch in Go"
date: "2024-11-20"
description: "Deep dive into consistent hashing, virtual nodes, and Raft consensus to build a production-grade distributed caching layer hitting 150k req/s."
tags: ["Go", "Distributed Systems", "Caching", "Raft"]
---

Distributed caches are everywhere — Redis, Memcached, DynamoDB Accelerator. Yet building one from scratch remains one of the most educational exercises a systems engineer can pursue. This post walks through **DistCache**, a distributed caching layer I built in Go that achieves 150k+ requests/second with sub-millisecond p99 latency.

## Why Build One?

Off-the-shelf solutions are great for production, but they obscure critical concepts:

- How do you route keys to the right node without a central coordinator?
- What happens when a node dies mid-request?
- How do you handle cache eviction fairly under load?

By building it yourself, you internalize the trade-offs.

## Architecture Overview

The system has three layers:

1. **Client library** — Routes requests using a ring hash
2. **Cache nodes** — Store KV data with LRU eviction
3. **Raft group** — Maintains cluster membership and leader election

```go
type CacheNode struct {
    id       string
    address  string
    store    *LRUCache
    ring     *ConsistentHash
    raftNode *raft.Node
}
```

## Consistent Hashing with Virtual Nodes

Consistent hashing solves the **key redistribution problem**. In a naive modulo-based scheme, adding a node requires remapping `~N/N+1` keys. With consistent hashing, only `~K/N` keys move (where K is the number of keys and N is the number of nodes).

Virtual nodes solve the **hotspot problem** by distributing each physical node across multiple positions on the ring:

```go
const virtualNodes = 150

func (h *ConsistentHash) AddNode(id, address string) {
    for i := 0; i < virtualNodes; i++ {
        key := fmt.Sprintf("%s#%d", id, i)
        hash := h.hashFn(key)
        h.ring[hash] = id
        h.sortedHashes = append(h.sortedHashes, hash)
    }
    sort.Slice(h.sortedHashes, func(i, j int) bool {
        return h.sortedHashes[i] < h.sortedHashes[j]
    })
}
```

With 150 virtual nodes per physical node, the standard deviation of key distribution fell to just **2.3%** in our benchmarks.

## LRU Eviction

Each node uses a combination of a doubly-linked list and a hash map for O(1) get and put:

```go
type LRUCache struct {
    capacity int
    list     *list.List
    items    map[string]*list.Element
    mu       sync.RWMutex
}

func (c *LRUCache) Get(key string) ([]byte, bool) {
    c.mu.RLock()
    el, ok := c.items[key]
    c.mu.RUnlock()
    if !ok {
        return nil, false
    }
    c.mu.Lock()
    c.list.MoveToFront(el)
    c.mu.Unlock()
    return el.Value.(*entry).value, true
}
```

> **Note:** The read lock is upgraded to a write lock only for `MoveToFront`. This lock upgrade pattern is a common source of bugs — always re-check state after upgrading.

## Raft for Cluster Membership

We use [hashicorp/raft](https://github.com/hashicorp/raft) for leader election and membership changes. Raft gives us **linearizable** node join/leave operations without split-brain.

When a node fails:

1. The Raft leader detects the heartbeat timeout
2. A new leader is elected (requiring quorum `(N/2)+1`)
3. The ring is updated and propagated to all remaining nodes
4. Keys formerly owned by the dead node are served from replicas

## Benchmarks

| Scenario                 | p50   | p99   | p999  |
| ------------------------ | ----- | ----- | ----- |
| Single node, no eviction | 0.3ms | 0.8ms | 1.2ms |
| 5 nodes, consistent hash | 0.6ms | 1.4ms | 2.1ms |
| 5 nodes, under eviction  | 0.7ms | 2.8ms | 5.6ms |

At 150k req/s sustained, memory usage stabilized at **~2.1 GB** across the cluster.

## What I'd Do Differently

- **Use a B-tree ring** instead of a sorted slice for O(log n) lookup
- **Add read replicas** to improve read availability
- **Implement a gossip protocol** for membership instead of Raft (simpler for this use case)

The full source is on [GitHub](https://github.com). This was one of the most rewarding projects I've built — if you're interested in systems programming, I'd highly recommend going through this exercise.
