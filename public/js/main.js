let arr = [];
// --------------------------header 시계 -------------------------
const $headerTimer = document.querySelector(".header-timer");
const $logoTitle = document.querySelector('.logo-title');
let title = [
`<span class="wT">W</span>`,
`<span>e</span>`,
`<span> </span>`,
`<span>a</span>`,
`<span>r</span>`,
`<span>e</span>`,
 `<span> </span>`,
`<span class="logoT firstT">F</span>`,
`<span>r</span>`,
`<span>o</span>`,
`<span>n</span>`,
`<span>t</span>`, 
`<span></span>`,
`<span class="logoT secondT">E</span>`,
`<span>n</span>`,
`<span>d</span>`,
`<span></span>`,
`<span>D</span>`,
`<span>e</span>`,
`<span>v</span>`,
`<span>e</span>`,
`<span>l</span>`,
`<span>o</span>`,
`<span>p</span>`,
`<span>e</span>`,
`<span>r</span>`,
`<span>s</span>`];

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
  } : ${sec < 10 ? "0" + sec : sec}`;
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
// TECH-Newest
// const $techNewHeadings = document.querySelector('.tech-new-headings');
// console.log($techNewHeadings)
// $techNewHeadings.onclick = async e => {
//   e.preventDefault();
//   if (!e.target.matches('.tech-new-headings > li > a')) return;
//   const res = await fetch(`/board/${e.target.parentNode.id}`);
//   arr = await res.json();
//   console.log(arr)
//   console.log(e.target.parentNode.id)
//   sessionStorage.setItem('content',JSON.stringify({id: +e.target.parentNode.id,nickname: arr.nickname}))
//   location.assign('../../content.html')
// }
const $loginIn = document.querySelector('.login-in');
const $logOut = document.querySelector('.logout');
  if(sessionStorage.getItem('login')) {
    $loginIn.classList.add('on');
    $logOut.classList.remove('on');
  } else {
    $loginIn.classList.remove('on');
    $logOut.classList.add('on');
  }
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
const $leftContainer = document.querySelector('.left-container')


// 렌더링
$techBoard.onclick = async e => {
  e.preventDefault();
  if (!e.target.matches('.tech-title-btn')) return
  let html = ''
  $leftContainer.innerHTML =  `<div class="board">
  <div class="box2">
  <h2 class="tech-heading">TECH Board</h2>
  <span class="caption">Hello World! 프론트엔드 개발자들의 기술개발 게시판</span>
  </div>
  <div class="filter-write">
      <select name="조건 검색" class="select-option">
          <option value="my-content">내글</option>
          <optgroup label="조회수">
              <option id="high" value="high">높은 순</option>
              <option id="row" value="row">낮은 순</option>
          </optgroup>
          <optgroup label="날짜 순">
              <option id="least-date" value="least-date">최근날짜 순</option>
              <option id="last-date" value="last-date">과거날짜 순</option>
          </optgroup>
      </select>
      <button class="write-btn">글쓰기</button>
      <div class="login-check">
          로그인 하시겠습니까?
          <div class="btn-group">
          <button class="btn-yes">네</button>
          <button class="btn-no">아니오</button>
         </div>
      </div>
  </div>
  <div class="board-header">
      <h3 class="title">제목</h3>
      <span class="nick-name">닉네임</span>
      <span class="heading-date">날짜</span>
      <span class="heading-click">조회수</span>
  </div>
  <ul class="board-list">
  </ul>
  <div class="page">
      <ul class="page-nation">
          <li class="page-item"> 
              <i class="fas fa-angle-double-left"></i>   
              <a href="#">1</a>
          </li>
          <li class="page-item"> <a href="#">2</a></li>
          <li class="page-item"> <a href="#">3</a></li>
          <li class="page-item"> <a href="#">4</a></li>
          <li class="page-item"> 
              <a href="#">5</a>
              <i class="fas fa-angle-double-right"></i>
          </li>
      </ul>
  </div>
</div>`
  const res = await fetch('/board');
  arr = await res.json();
  render(arr);
}
const render = async (todo) => {
  const $boardList = document.querySelector('.board-list');
  //글쓰기 버튼
  const $writeBtn = document.querySelector('.write-btn');
 // login check
  const $loginCheck = document.querySelector('.login-check');
  const $btnGroup = document.querySelector('.btn-group');
  const $selectOption = document.querySelector('.select-option');
  let html = '';
    [...todo].forEach(list => {
    html += `<li id="${list.id}">
    <a href="#">${list.title}</a>
    <span class="author">${list.nickname}</span>
    <time class="time">
      ${list.time}
        <span class="year"></span>
        <span class="month"></span>
        <span class="date"></span>
    </time>
    <span class="click">${list.clickcount}</span>
</li>`}
    )
    $boardList.innerHTML = html;
  // 컨텐트 보기
  $boardList.onclick = async e => {
    e.preventDefault();
    if (!e.target.matches('.board-list > li > a')) return;
    let counter = 1;
    console.log(e.target.parentNode.id)
    const res = await fetch(`/board/${e.target.parentNode.id}`);
    arr = await res.json();
    console.log(arr)

    const clickcounter = [arr].find((item) => item.id === +e.target.parentNode.id)


    await fetch(`/board/${e.target.parentNode.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clickcount: clickcounter.clickcount + counter }),
        });
        render(arr);

    sessionStorage.setItem('content',JSON.stringify({id: +e.target.parentNode.id, nickname: arr.nickname}))
    location.assign('../../content.html')
  }
  $writeBtn.onclick = () => {
    if(!sessionStorage.getItem('login')){
      console.log('login이 필요합니다.')
      $loginCheck.classList.add('on');
      $btnGroup.onclick = e => {
        if (e.target.matches('.btn-yes')) location.assign('../signin.html');
        else if(e.target.matches('.btn-no')) $loginCheck.classList.remove('on');
      }
    } else {
      window.location.href = './write.html'
    }
  }
$selectOption.onchange = async (e) => {
  // if(최근 날짜순을 클릭했다면)
  if(e.target.value === 'least-date'){
    const res2 = await fetch('/board?_sort=id,views&_order=desc,asc');
    const least = await res2.json();
    console.log(least); // <- board db json (배열안에 객체)
    render(least);
  }
  // // if(과거 날짜순을 클릭했다면)
  else if(e.target.value === 'last-date') {
    const res3 = await fetch('/board');
    const last = await res3.json();
    console.log(last); // <- board db json (배열안에 객체)
    render(last);
  }
  else if(e.target.value === 'high') {
    console.log(e.target.value)
    const res4 = await fetch('/board/?_sort=clickcount&_order=desc');
    const high = await res4.json();
    console.log(high); // <- board db json (배열안에 객체)
    render(high);
}
else if(e.target.value === 'row') {
  const res5 = await fetch('/board/?_sort=clickcount&_order=asc');
  const row = await res5.json();
  console.log(row); // <- board db json (배열안에 객체)
  render(row);
}
else if(e.target.value === 'my-content') {
  const res6 = await fetch('/board/');
  arr= await res6.json();
  const LoginUser = JSON.parse(sessionStorage.getItem('login'));
  arr = arr.filter(item => item.nickname === LoginUser.nickname)
  console.log(arr)
  render(arr)
  // console.log(myContent); // <- board db json (배열안에 객체)
  // render(myContent);
}
}
}
// 메인으로 가기
// $header.onclick = e => {
//   e.preventDefault();
//   location.assign('../../index.html')
// }


const $techNewList = document.querySelector('.tech-new-list');

const $techNewHeadings = document.querySelector('.tech-new-headings');

// tech-list
const render2 = todo => {
  let headings='';
  let html = '';

 
  [...todo].forEach(list => {
    headings+= `<li id ="${list.id}" class="top-tech-new-item">
  <a href="#" class="top-new-title">${list.title}</a>
  <span class="top-author">${list.nickname}</span>

  <time class="top-time">
    ${list.time}
      <span class="year"></span>
      <span class="month"></span>
      <span class="date"></span>
  </time>

  <span class="click">${list.clickcount}</span>
</li>`}
  )
  // $techNewHeadings.innerHTML = headings;
  $techNewList.innerHTML = html;
}

// hot -list
const $techHotList = document.querySelector('.tech-hot-list')
const render3 = todo => {
  let html = '';

  [...todo].forEach(list => {
  html += `<li id ="${list.id}" class="tech-new-item carousel-item">
  <a class="new-item-heading">${list.title}</a>
  <span class="author">${list.nickname}</span>

  <time class="time">
    ${list.time}
      <span class="year"></span>
      <span class="month"></span>
      <span class="date"></span>
  </time>
  <span class="click">${list.clickcount}</span>
</li>`}
  )
  // $techHotList.innerHTML = html;
}

const list = async e => {
  // const res = await fetch('/board/?_sort=id,views&_order=desc,asc&_page=1&_limit=4');
  // arr = await res.json();
  // render2(arr);
  const res1 = await fetch('/board/?_sort=clickcount&_order=desc&_page=1&_limit=4')
  arr = await res1.json();
  render3(arr);
  // const carousel = new Carousel();
}

list();

// li go write



// 로그인

const $Login = document.querySelector('.login');

$Login.onclick = e => {
  e.preventDefault();
  console.log('gg')
  console.log(e.target)
  if (e.target.matches('.login > .login-in')){
    location.href = '../signin.html';
  } else {
    sessionStorage.clear();
    location.href = '../index.html';
  }
  
}