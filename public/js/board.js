 let arr = [];

  const $years = document.querySelectorAll('.year'); // <- 유사배열객체인 NodeList 가 반환된다.
  // console.log($years); // NodeList
  // console.log(typeof $years); // object
  // console.log(Array.isArray($years)); // false <- 유사배열객체


  const $months = document.querySelectorAll('.month');
  const $dates = document.querySelectorAll('.date');

  //글쓰기 버튼
  const $writeBtn = document.querySelector('.write-btn');
 const $boardList = document.querySelector('.board-list');

 // login check
const $loginCheck = document.querySelector('.login-check');
const $btnGroup = document.querySelector('.btn-group');

  const date = new Date();
  const yearText = date.getFullYear();
  const monthText = date.getMonth() + 1;
  const dateText = date.getDate();


  $years.forEach(year => { year.textContent =   `${yearText} /` } )
  $months.forEach(month => { month.textContent =   `${monthText} /` } )
  $dates.forEach(date => { date.textContent =   dateText } )



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

  window.onload = async e => {
    const res = await fetch('/board');
    arr = await res.json();
    console.log(arr);

    render(arr);

  }

  const render = (todo) => {

    let html = '';

      [...todo].forEach(list => {
      html += `<li id = "${list.id}">
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
  }

  // 카운터
  const counter = (function () {

    let num = 0;
  
    return {
      increase() {
        return ++num;
      }
    };
  }());



$boardList.onclick = async e => {
  
  fetch('')

  console.log(counter.increase());


}