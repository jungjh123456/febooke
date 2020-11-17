  // ul.board-list


  const $years = document.querySelectorAll('.year'); // <- 유사배열객체인 NodeList 가 반환된다.
  // console.log($years); // NodeList
  // console.log(typeof $years); // object
  // console.log(Array.isArray($years)); // false <- 유사배열객체


  const $months = document.querySelectorAll('.month');
  const $dates = document.querySelectorAll('.date');

  //글쓰기 버튼
  const $writeBtn = document.querySelector('.write-btn');


  const date = new Date();
  const yearText = date.getFullYear();
  const monthText = date.getMonth() + 1;
  const dateText = date.getDate();


  $years.forEach(year => { year.textContent =   `${yearText} /` } )
  $months.forEach(month => { month.textContent =   `${monthText} /` } )
  $dates.forEach(date => { date.textContent =   dateText } )



  $writeBtn.onclick = () => {
    window.location.href = './write.html'
  }