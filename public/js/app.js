let arr = [];
// --------------------회원가입-------------------------//

const $loginInput = document.querySelector('.login-input');
const $passInput = document.querySelector('.pass-input');
const $btnLogin = document.querySelector('.btn-login');

const debounce = (callback, delay) => {
  let timerId;
  // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
    // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};


const logIn = async () => {
  const res = await fetch('/users')
  arr = await res.json();

  console.log(arr);

  $loginInput.onkeyup = debounce(e => {
    console.log(e.target)
    
},300);

logIn();





// $btnSignup.onclick = e => {
  
//   location.assign('../../signup.html');
// }

// db






// // storage

// let defaultStorage = firebase.storage();
// let storageRef = firebase.storage().ref().child('/images/');



// var file = '../image/ok.png'
// storageRef.put(file).then(function(snapshot){
//   console.log(snapshot)
  
// })
