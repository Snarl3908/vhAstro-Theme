// Pre Code 代码复制功能======
let copyText = null;
// Pre 滚动条======
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";
export default () => {
  // Pre 滚动条======
  document.querySelectorAll("section.vh-code-box>pre.astro-code").forEach((pre: any) => {
    OverlayScrollbars(pre, { scrollbars: { autoHide: "leave", autoHideDelay: 500, autoHideSuspend: false } });
    // 修复：滚动到顶/底时让滚轮事件冒泡到页面
    pre.addEventListener("wheel", function(e: WheelEvent) {
      const { scrollTop, scrollHeight, clientHeight } = pre;
      const isAtTop = scrollTop === 0 && e.deltaY < 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (isAtTop || isAtBottom) {
        // 允许事件冒泡到页面，让页面继续滚动
        e.preventDefault();
        e.stopPropagation();
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
      // 否则正常滚动代码块
    }, { passive: false });
  });
  // Pre Code 代码复制功能======
  document.querySelectorAll("section.vh-code-box>span.vh-code-copy").forEach((i: any) => {
    i.vhTimer = null;
    i.addEventListener("click", async () => {
      if (i.vhTimer) clearTimeout(i.vhTimer);
      copyText = i.parentElement.querySelector("pre.astro-code code")?.innerText;
      if (!copyText) return;
      await navigator.clipboard.writeText(copyText);
      i.classList.add("success");
      i.vhTimer = setTimeout(() => {
        i.classList.remove("success");
        i.vhTimer = null;
      }, 1000);
    });
  });
}