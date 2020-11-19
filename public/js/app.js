let arr = [];
let idArr = [];
let nick = [];
// -------------------- 로그인 -------------------------//

const $loginInput = document.querySelector(".login-input");
const $passInput = document.querySelector(".pass-input");
const $btnLogin = document.querySelector(".btn-login");
const $btnClose = document.querySelector(".fa-times-circle");
const $btnClose2 = document.querySelector(".close");
const $checkSign = document.querySelector(".check-sign");
const $checkText = document.querySelector(".check-text");
const $checkText2 = document.querySelector(".check-text2");
const $container = document.querySelector(".container");
const $btnJoin = document.querySelector(".btn-join");
const $btnSignup = document.querySelector(".btn-signup");
const $checkSign2 = document.querySelector(".check-sign2");
const $checkId = document.getElementById("checkId");

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
    if(!$loginInput.value){
      $checkSign.classList.toggle("on");
    // $checkText.style.display = "block";
    $checkText.textContent = "아이디를 입력해주세요";
    return;
    }
    if(!$passInput.value){
      console.log('입력안댐')
      $checkSign2.classList.toggle("no-pass");
      $checkText2.textContent = "패스워드를 입력해주세요."
      return;
    }
    if (idArr.filter((item, i, arr) => $loginInput.value === arr[i]).length) {
      for (let i = 0; i < passArr.length; i++) {
        if (passArr[i] === $passInput.value) {
          nick = arr.find((nick) => nick.id === $loginInput.value);
          sessionStorage.setItem(
            "login",
            JSON.stringify({ id: $loginInput.value, nickname: nick.nickname })
          );
          localStorage.setItem(
            "login",
            JSON.stringify({ id: $loginInput.value, nickname: nick.nickname })
          );
          localStorage.setItem("remember", $checkId.checked);
          $loginInput.setAttribute('value','');
          $passInput.setAttribute('value','');
          location.assign("../index.html");
          break;
        } else{
          if ($checkSign2.classList.contains("no-pass")) {
            $checkSign2.classList.remove("no-pass");
          }
          $checkSign2.classList.toggle("no-pass");
          $checkText2.textContent = "패스워드가 틀렸습니다.";
          return;
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

$btnClose2.onclick = (e) => {
  $checkSign2.classList.remove("no-pass");
};

window.onkeyup = (e) => {
  if (e.keyCode === 27) {
    $checkSign.classList.remove("on");
    $checkSign2.classList.remove("no-pass");
  }
};

$btnJoin.onclick = (e) => {
  location.assign("../signup.html");
};

logIn();

$loginInput.onkeyup = debounce((e) => {}, 300);

$btnSignup.onclick = (e) => {
  e.preventDefault();
  location.assign("../signup.html");
};

logIn();

window.onload = (e) => {
  let remember = localStorage.getItem("remember");
  let rememberParse = JSON.parse(remember);
  let obj = JSON.parse(localStorage.getItem("login"));

  // 만약 체크 되어있으면
  if (rememberParse) {
    $loginInput.value = obj.id;
    $checkId.checked = rememberParse;
  } else {
    $loginInput.value = "";
    $checkId.checked = false;
  }
};
