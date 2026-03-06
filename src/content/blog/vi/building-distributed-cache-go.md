---
title: "Tự xây Distributed Cache bằng Go: Từ Consistent Hashing đến Raft"
date: "2024-11-20"
description: "Mổ xẻ bài toán consistent hashing, virtual node và Raft để dựng một lớp distributed cache chạy production ổn định ở mức 150k req/s."
tags: ["Go", "Hệ thống phân tán", "Bộ nhớ đệm", "Raft"]
---

Distributed cache có mặt ở khắp nơi: Redis, Memcached, DynamoDB Accelerator. Nhưng tự tay build một hệ thống như vậy vẫn là bài tập rất đáng làm cho bất kỳ ai theo systems engineering. Trong bài này mình chia sẻ cách mình xây **DistCache** bằng Go, chạy hơn 150k requests/second với p99 dưới 1ms.

## Vì sao nên tự làm?

Giải pháp đóng gói sẵn rất tốt cho production, nhưng thường che mất nhiều khái niệm cốt lõi:

- Làm sao route key đúng node mà không cần coordinator trung tâm?
- Nếu node chết giữa request thì chuyện gì xảy ra?
- Eviction thế nào để không bị "thiên vị" khi tải tăng cao?

Khi tự build, bạn buộc phải đối mặt và hiểu rõ trade-off của từng quyết định.

## Tổng quan kiến trúc

Hệ thống gồm 3 lớp:

1. **Client library** - Route request theo hash ring
2. **Cache nodes** - Lưu dữ liệu key-value, eviction bằng LRU
3. **Raft group** - Quản lý membership và bầu leader

```go
type CacheNode struct {
    id       string
    address  string
    store    *LRUCache
    ring     *ConsistentHash
    raftNode *raft.Node
}
```

## Consistent Hashing và Virtual Nodes

Consistent hashing giải quyết bài toán **phân phối lại key**. Nếu dùng modulo đơn giản, mỗi lần thêm node là phải remap một lượng key rất lớn. Với consistent hashing, số key cần dịch chuyển giảm đi đáng kể.

Virtual node giúp giảm **hotspot** bằng cách rải một physical node ra nhiều vị trí trên ring:

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

Trong benchmark của mình, khi dùng 150 virtual node cho mỗi physical node, độ lệch phân phối key chỉ còn khoảng **2.3%**.

## LRU Eviction

Mỗi node dùng doubly-linked list + hash map để giữ thao tác `get/put` ở O(1):

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

> **Lưu ý:** Đoạn nâng cấp lock từ read sang write để gọi `MoveToFront` là chỗ rất dễ dính bug. Khi đổi lock level, luôn kiểm tra lại state trước khi thao tác tiếp.

## Dùng Raft để quản lý membership

Mình dùng [hashicorp/raft](https://github.com/hashicorp/raft) để bầu leader và xử lý thay đổi membership. Raft cho mình tính nhất quán mạnh (linearizable) khi node join/leave, nhờ đó tránh split-brain.

Khi một node bị lỗi:

1. Raft leader phát hiện heartbeat timeout
2. Bầu leader mới (cần quorum `(N/2)+1`)
3. Cập nhật ring và phát tán cấu hình cho các node còn lại
4. Các key của node đã chết sẽ được phục vụ từ replica

## Benchmark

| Kịch bản                   | p50   | p99   | p999  |
| -------------------------- | ----- | ----- | ----- |
| 1 node, chưa có eviction   | 0.3ms | 0.8ms | 1.2ms |
| 5 node, consistent hashing | 0.6ms | 1.4ms | 2.1ms |
| 5 node, có áp lực eviction | 0.7ms | 2.8ms | 5.6ms |

Ở mức tải 150k req/s liên tục, memory toàn cluster ổn định quanh **~2.1 GB**.

## Nếu làm lại, mình sẽ đổi gì?

- **Dùng B-tree cho ring** thay vì sorted slice để tối ưu lookup theo O(log n)
- **Bổ sung read replica** để tăng khả năng chịu lỗi phía đọc
- **Cân nhắc gossip protocol** cho membership ở use case này (đơn giản hơn Raft)

Source code đầy đủ có trên [GitHub](https://github.com). Đây là một trong những project mình thấy "đáng tiền" nhất về mặt học hệ thống. Nếu bạn quan tâm systems programming, rất nên tự đi hết bài tập này ít nhất một lần.
