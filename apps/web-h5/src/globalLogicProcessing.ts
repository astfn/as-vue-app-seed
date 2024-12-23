/**
 * 是否在微信浏览器打开
 */
window.IN_WECHAT = false;
const ua = navigator.userAgent.toLocaleLowerCase();
if (ua.indexOf('micromessenger') > -1) {
  window.IN_WECHAT = true;
}

/**
 *  阻止用户缩放页面
 */
// 阻止双指放大
document.addEventListener('gesturestart', function (event) {
  event.preventDefault();
});
// 阻止双击放大
document.addEventListener('dblclick', function (event) {
  event.preventDefault();
});
// 阻止用户快速点击页面
let lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
