// --------------------회원가입-------------------------//

let arr = [];
var state = "false";

const $signupFieldset = document.querySelector(".signup-fieldset");
const $signupName = document.querySelector(".signup-name");
const $signupNick = document.querySelector(".signup-nick");
const $signupBtn = document.querySelector(".signup-btn");
const $signupId = document.querySelector(".signup-id");
const $signupPass = document.querySelector(".signup-pass");
const $input = document.querySelectorAll("input");
const $signupPass2 = document.querySelector(".signup-pass2");
const $signupNumber = document.querySelector(".signup-number");
const $checkPhone = document.querySelector(".check-phone");
const $checkDuplicated = document.querySelector(".check-duplicated");
const $checkAlert = document.querySelector(".check-alert");
const $confirmBtn = document.querySelector(".confirm-btn");
const $container = document.querySelector(".container");
const $overlay = document.querySelector(".overlay");
const $checkText = document.querySelector(".check-text");
const $checkNoid = document.querySelector(".check-noid");
const $confirmBtnNoid = document.querySelector(".confirm-btn-noid");
const $checkEmail = document.querySelector(".check-email");
const $checkFail = document.querySelector(".check-fail");
const $confirmBtnFail = document.querySelector(".confirm-btn-fail");

$signupBtn.onclick = async (e) => {
  e.preventDefault();

  const newUser = {
    name: $signupName.value,
    id: $signupId.value,
    password: $signupPass.value,
    nickname: $signupNick.value,
    phone: $signupNumber.value,
  };

  if (
    $signupName.value &&
    $signupNick.value &&
    $signupNumber.value &&
    $signupId.value &&
    $signupPass.value &&
    $signupPass2.value
  ) {
    state = "true";
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    console.log(res);
    location.assign("../signin.html");
  } else {
    console.log("에러");
    console.log("$btnSignup");
  }
};

const redBorder = (e) => {
  e.target.style.borderBottomColor = "red";
};

const clearBorder = (e) => {
  e.target.style.borderBottomColor = "#f0f3f4";
};

// 유저 이름

const filterBorder = () => {
  if (state === "false") {
    $signupBtn.style.opacity = "0.6";
    $signupBtn.style.cursor = "not-allowed";
  } else if (state === "true") {
    $signupBtn.style.opacity = "1";
    $signupBtn.style.cursor = "pointer";
  }
};

$signupName.onkeyup = (e) => {
  if (+$signupName.value || !$signupName.value.trim()) {
    state = "false";
    redBorder(e);
  } else if (e.key > 0 && e.key < 9) {
    state = "false";
    redBorder(e);
  } else {
    clearBorder(e);
  }
  filterBorder();
};

// 닉네임
const $checkNick = document.querySelector('.check-nick');

const nickfilter = async () => {
  let nickFillter = await fetch("/users");
  arr = await nickFillter.json();
  console.log(arr);
  let nickname = arr.map((item) => item.nickname);
  $signupNick.onkeyup = (e) => {
    if (nickname.filter((item) => item === $signupNick.value).length) {
      console.log("error");
      state = "false";
      $checkNick.classList.add('on')
      redBorder(e);
    } else {
      clearBorder(e);
      $checkNick.classList.remove('on');
    }

    filterBorder();
  };
};

nickfilter();

// id

// 이메일 유효성
function chkEmail(str) {
  let email = str;
  let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!regExp.test(str)) {
    return false;
  }

  return true;
}

const idFilter = async () => {
  let nickFillter = await fetch("/users");
  arr = await nickFillter.json();
  let idName = arr.map((item) => item.id);
  console.log(idName);
  $signupId.onkeyup = (e) => {
    if (idName.filter((item) => item === $signupId.value).length) {
      console.log("중복");
      state = "false";
      redBorder(e);
    } else if (!$signupId.value) {
      $checkEmail.classList.remove("email-on");
      clearBorder(e);
    } else if (chkEmail($signupId.value) !== true) {
      $checkEmail.classList.add("email-on");
      state = "false";
      redBorder(e);
    } else {
      state = "true";
      $checkEmail.classList.remove("email-on");
      clearBorder(e);
    }

    filterBorder();
  };
};

// id 중복검사
// $checkDuplicated.onclick = async (e) => {
//   e.preventDefault();
//   let res = await (await fetch("/users")).json();
//   let idArray = res.map((item) => item.id);
//   if (!$signupId.value) {
//     window.alert(".");
//   } else if (idArray.filter((idValue) => $signupId.value === idValue).length) {
//     console.log("이미 사용중인 아이디입니다.");
//   } else {
//     console.log("사용 가능한 아이디입니다.");
//   }
// };

idFilter();

$signupPass.onkeyup = (e) => {
  if ($signupPass.value.length >= 13) {
    state = "false";
    redBorder(e);
  } else {
    clearBorder(e);
  }

  filterBorder();
};
const $checkPass = document.querySelector('.check-pass')
$signupPass2.onkeyup = (e) => {
  if (
    $signupPass2.value !== $signupPass.value ||
    $signupPass.value.length >= 13
  ) {
    state = "false";
    redBorder(e);
    $checkPass.classList.add('on')

  } else {
    clearBorder(e);
    $checkPass.classList.remove('on')
  }
  filterBorder();
};

$signupNumber.onkeyup = (e) => {
  $signupNumber.value = $signupNumber.value.replace(/\-/g, "");
  if (isNaN(+$signupNumber.value) || !$signupNumber.value) {
    state = "false";
    $checkPhone.classList.add("phone-on");
    redBorder(e);
    filterBorder();
  } else {
    state = "true";
    clearBorder(e);
    $checkPhone.classList.remove("phone-on");
    filterBorder();
  }
};

if (state === "false") {
  $signupBtn.style.opacity = "0.6";
  $signupBtn.style.cursor = "not-allowed";
} else if (state === "true") {
  $signupBtn.style.opacity = "1";
  $signupBtn.style.cursor = "pointer";
}

// alert 창
$checkDuplicated.onclick = async (e) => {
  e.preventDefault();
  let res = await await (await fetch("/users")).json();
  let idArray = res.map((item) => item.id);
  if (!$signupId.value) {
    $overlay.classList.toggle("overlay-noid");
    $checkNoid.classList.toggle("check-noid-on");
  } else if (
    idArray.filter((idValue) => $signupId.value === idValue).length ||
    chkEmail($signupId.value) !== true
  ) {
    $checkFail.classList.toggle("check-fail-on");
    $overlay.classList.toggle("overlay-fail");
  } else {
    $checkAlert.classList.toggle("check-on");
    $overlay.classList.toggle("overlay-active");
    $checkText.textContent = "Available!";
  }
};

$confirmBtn.onclick = (e) => {
  e.preventDefault();
  $checkAlert.classList.toggle("check-on");
  $overlay.classList.toggle("overlay-active");
};

$confirmBtnNoid.onclick = (e) => {
  e.preventDefault();
  $checkNoid.classList.toggle("check-noid-on");
  $overlay.classList.toggle("overlay-noid");
};

$confirmBtnFail.onclick = (e) => {
  e.preventDefault();
  $checkFail.classList.toggle("check-fail-on");
  $overlay.classList.toggle("overlay-fail");
};

window.onkeyup = (e) => {
  if (e.keyCode !== 27) return;
  $checkAlert.classList.remove("check-on");
  $overlay.classList.remove("overlay-active");
};
