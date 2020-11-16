// --------------------------header 시계 -------------------------
const $hour = document.querySelector(".hour");
const $minute = document.querySelector(".minute");
const $second = document.querySelector(".second");
const $headerTimer = document.querySelector(".header-timer");

(function printNow() {
  const now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  $headerTimer.textContent = `${hour < 10 ? "0" + hour : hour} : ${
    min < 10 ? "0" + min : min
  } : ${sec < 10 ? "0" + sec : sec}`;

  setTimeout(printNow, 1000);
})();
