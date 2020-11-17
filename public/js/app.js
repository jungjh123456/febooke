let arr = [];
let idArr = [];
// -------------------- 로그인 -------------------------//

const $loginInput = document.querySelector(".login-input");
const $passInput = document.querySelector(".pass-input");
const $btnLogin = document.querySelector(".btn-login");

const logIn = async () => {
  const res = await fetch("/users");
  arr = await res.json();
  idArr = arr.map((idArr) => idArr.id);
  passArr = arr.map((passArr) => passArr.password);

  $btnLogin.onclick = (e) => {
    e.preventDefault();
    if (idArr.filter((item, i, arr) => $loginInput.value === arr[i]).length) {
      for (let i = 0; i < passArr.length; i++) {
        if (passArr[i] === $passInput.value) {
          window.alert("성공했습니다.");
        }
      }
    } else window.alert("실패했습니다.");
  };
};

logIn();
