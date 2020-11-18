let arr = [];
let idArr = [];
let nick = [];
// -------------------- 로그인 -------------------------//

const $loginInput = document.querySelector(".login-input");
const $passInput = document.querySelector(".pass-input");
const $btnLogin = document.querySelector(".btn-login");
const $btnClose = document.querySelector(".fa-times-circle");
const $checkSign = document.querySelector(".check-sign");
const $checkText = document.querySelector(".check-text");
const $container = document.querySelector(".container");
const $btnJoin = document.querySelector(".btn-join");
const $btnSignup = document.querySelector('.btn-signup');


const debounce = (callback, delay) => {
  let timerId;
  // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
  return (event) => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
    // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

const logIn = async () => {
  const res = await fetch("/users");
  arr = await res.json();

  idArr = arr.map((idArr) => idArr.id);
  passArr = arr.map((passArr) => passArr.password);

  $btnLogin.onclick = async (e) => {
    e.preventDefault();
    // 아이디 성공
    if (idArr.filter((item, i, arr) => $loginInput.value === arr[i]).length) {
      for (let i = 0; i < passArr.length; i++) {
        if (passArr[i] === $passInput.value) {
          nick = arr.find((nick) => nick.id === $loginInput.value);
          sessionStorage.setItem(
            "login",
            JSON.stringify({ id: $loginInput.value, nickname: nick.nickname })
          );
          location.assign("../index.html");
        } else {
          $checkSign.classList.toggle("on");
          $checkText.textContent = "패스워드를 확인해주세요.";
        }
      }
    } else {
      // 아이디가 없을 때
      $checkSign.classList.toggle("on");
      // $checkText.style.display = "block";
      $checkText.textContent = "등록된 아이디가 없습니다";

    }
  };
};

$btnClose.onclick = (e) => {
  $checkSign.classList.remove("on");
};

window.onkeyup = (e) => {
  if (e.keyCode === 27) {
    $checkSign.classList.remove("on");
  }
};

$btnJoin.onclick = (e) => {
  e.preventDefault();
  location.assign("../signup.html");
};

logIn();

console.log(arr);

$loginInput.onkeyup = debounce((e) => {
  console.log(e.target);
}, 300);

$btnSignup.onclick = e => {
  e.preventDefault();
  location.assign('../signup.html')
}


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
