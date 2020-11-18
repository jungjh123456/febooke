// --------------------회원가입-------------------------//

let arr = [];
var state = "false";

const $signupFieldset = document.querySelector(".signup-fieldset");
const $signupName = document.querySelector(".signup-name");
const $signupNick = document.querySelector(".signup-nick");
const $signupBtn = document.querySelector(".signup-btn");
const $signupId = document.querySelector(".signup-id");
const $signupPass = document.querySelector(".signup-pass");
const $input = document.querySelector("input");
const $signupPass2 = document.querySelector(".signup-pass2");
const $signupNumber = document.querySelector(".signup-number");
const $checkPhone = document.querySelector(".check-phone");
const $signupCancelBtn = document.querySelector('.signup-cancel-btn');

$signupBtn.onclick = async (e) => {
  e.preventDefault();

  const newUser = {
    name: $signupName.value,
    id: $signupId.value,
    password: $signupPass.value,
    nickname: $signupNick.value,
    phone: $signupNumber.value,
  };

  if ($input.value) {
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
  }
};

const redBorder = (e) => {
  e.target.style.borderBottomColor = "red";
};

const clearBorder = (e) => {
  e.target.style.borderBottomColor = "#f0f3f4";
};

// 유저 이름

$signupName.onkeyup = (e) => {
  if (+$signupName.value || !$signupName.value.trim()) {
    state = "false";
    redBorder(e);
  } else if (e.key > 0 && e.key < 9) {
    state = "false";
    redBorder(e);
  } else {
    state = "true";
    clearBorder(e);
  }

  if (state === "false") {
    $signupBtn.style.opacity = "0.6";
    $signupBtn.style.cursor = "not-allowed";
  } else if (state === "true") {
    $signupBtn.style.opacity = "1";
    $signupBtn.style.cursor = "pointer";
  }
};

// 닉네임

const nickfilter = async () => {
  let nickFillter = await fetch("/users");
  arr = await nickFillter.json();
  console.log(arr);
  let nickname = arr.map((item) => item.nickname);

  $signupNick.onkeyup = (e) => {
    if (nickname.filter((item) => item === $signupNick.value).length) {
      console.log("error");
      state = "false";
      redBorder(e);
    } else {
      state = "true";
      clearBorder(e);
    }

    if (state === "false") {
      $signupBtn.style.opacity = "0.6";
      $signupBtn.style.cursor = "not-allowed";
    } else if (state === "true") {
      $signupBtn.style.opacity = "1";
      $signupBtn.style.cursor = "pointer";
    }
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
    } else if (chkEmail($signupId.value) !== true) {
      console.log("이메일 형식이 아닙니다");
      state = "false";
      redBorder(e);
    } else {
      state = "true";
      clearBorder(e);
    }

    if (state === "false") {
      $signupBtn.style.opacity = "0.6";
      $signupBtn.style.cursor = "not-allowed";
    } else if (state === "true") {
      $signupBtn.style.opacity = "1";
      $signupBtn.style.cursor = "pointer";
    }
  };
};

idFilter();

$signupPass.onkeyup = (e) => {
  if ($signupPass.value.length >= 13) {
    state = "false";
    redBorder(e);
  } else {
    state = "true";
    clearBorder(e);
  }

  if (state === "false") {
    $signupBtn.style.opacity = "0.6";
    $signupBtn.style.cursor = "not-allowed";
  } else if (state === "true") {
    $signupBtn.style.opacity = "1";
    $signupBtn.style.cursor = "pointer";
  }
};

$signupPass2.onkeyup = (e) => {
  if (
    $signupPass2.value !== $signupPass.value ||
    $signupPass.value.length >= 13
  ) {
    state = "false";
    redBorder(e);
  } else {
    state = "true";
    clearBorder(e);
  }
  if (state === "false") {
    $signupBtn.style.opacity = "0.6";
    $signupBtn.style.cursor = "not-allowed";
  } else if (state === "true") {
    $signupBtn.style.opacity = "1";
    $signupBtn.style.cursor = "pointer";
  }
};

$signupNumber.onkeyup = (e) => {
  $signupNumber.value = $signupNumber.value.replace(/\-/g, "");
  state = "true";
  clearBorder(e);
  if (isNaN(+$signupNumber.value || $signupNumber.value)) {
    $checkPhone.classList.add("phone-on");
    redBorder(e);
  } else {
    $checkPhone.classList.remove("phone-on");
  }
};

if (state === "false") {
  $signupBtn.style.opacity = "0.6";
  $signupBtn.style.cursor = "not-allowed";
} else if (state === "true") {
  $signupBtn.style.opacity = "1";
  $signupBtn.style.cursor = "pointer";
}


// 취소 버튼 누를 시 메인페이지

$signupCancelBtn.onclick = e => {
  e.preventDefault();
  location.assign('../index.html');
}