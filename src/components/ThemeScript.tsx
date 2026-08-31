// Runs before first paint so the correct theme and reading width are applied
// without a flash. Stored preference wins; otherwise follow the OS setting.
const script = `(function(){try{var r=document.documentElement;var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");r.setAttribute("data-theme",t);r.style.colorScheme=t;var w=localStorage.getItem("reading-width");r.setAttribute("data-reading-width",w==="wide"?"wide":"narrow");}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
