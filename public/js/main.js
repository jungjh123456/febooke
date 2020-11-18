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
const $headerSearch = document.querySelector('.header-search');
const $header = document.querySelector('.header');

//헤더 함수, 이벤트
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


// 첫로딩 이벤트
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
        const $secondT = document.querySelector('.secondT');
        $logoTitle.classList.add('lastTime');
        $firstT.style.transition = '2s';
        $secondT.style.transition = '2s';

      },2000)
      setTimeout(()=> {
        $logoImage.classList.add('showImage');
        $headerSearch.classList.add('showSearch');
        $logoTitle.classList.add('downT');
        $header.classList.add('showColor');
      },4000)
    };
    ++titleCount;
  },120);
}

// 기술 게시판 변수, 함수, 이벤트
// 게시판 statement
const $techBoard = document.querySelector('.tech-board');
const $techStatement = document.querySelector('.tech-statement');

let stateCount = 0;
let stateColor = 0;
setInterval(()=>{
  if(stateCount){
    $techBoard.classList.remove('transStatement');
    --stateCount;
  }else{
    $techBoard.classList.add('transStatement');
    ++stateCount;
  }
},1000);
setTimeout(()=>{setInterval(()=>{
  [...$techStatement.children].forEach((item,i) => {
    item.classList.toggle('stateColor', i===stateColor);
  })
  stateColor===2 ? stateColor=0 : stateColor++;
},1500)},5000)



const $signup = document.querySelector('.signup');

$signup.onclick = e => {
  e.preventDefault();
  location.assign('../../signup.html');
}

