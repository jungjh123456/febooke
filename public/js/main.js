// --------------------------header 시계 -------------------------
const $headerTimer = document.querySelector(".header-timer");
const $logoTitle = document.querySelector('.logo-title');
let title = [`<span class="wT">W</span>`,`<span>e</span>`,
`<span> </span>`,`<span>a</span>`,`<span>r</span>`,
`<span>e</span>`, `<span> </span>`,
`<span class="logoT firstT">F</span>`,`<span>r</span>`,`<span>o</span>`,`<span>n</span>`,`<span>t</span>`, 
`<span></span>`,`<span class="logoT secondT">E</span>`,
`<span>n</span>`,`<span>d</span>`,`<span></span>`,
`<span>D</span>`,`<span>e</span>`,`<span>v</span>`,`<span>e</span>`,`<span>l</span>`,`<span>o</span>`,
`<span>p</span>`,`<span>e</span>`,`<span>r</span>`,`<span>s</span>`];

let titleLength = title.length;
const $logoImage = document.querySelector('.logo-image');

(function printNow() {
  const now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  $headerTimer.textContent = `${hour < 10 ? "0" + hour : hour} : ${
    min < 10 ? "0" + min : min
  }.${sec < 10 ? "0" + sec : sec}`;

  setTimeout(printNow, 1000);
})();


const printTitle = (printCount) => {

}
let titleCount = 0;
window.onload = e=>{
  const key = setInterval(()=> {
    $logoTitle.innerHTML +=title[titleCount];
    const $newT = $logoTitle.lastElementChild;
    $newT.style.left = `${titleCount*($newT.textContent===''||4)}%`;

    if(titleCount === titleLength-1) {

      clearInterval(key)

      $logoTitle.style.transition = '2s';
      $logoTitle.classList.add('midTime');
      setTimeout(()=>{
        const $firstT = document.querySelector('.firstT');
        const $secondT = document.querySelector('.seondT');
        $logoTitle.classList.add('lastTime');
        $firstT.style.transition = '2s';
        $secondT.style.transition = '2s';

      },2000)
      setTimeout(()=> {
        $logoImage.classList.add('showImage');
      },4000)
    };
    ++titleCount;
  },120);
}


const $signup = document.querySelector('.signup');

$signup.onclick = e => {
  e.preventDefault();
  location.assign('../../signup.html');
}

