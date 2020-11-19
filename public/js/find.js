let arr = [];
// 이메일로 아이디 찾기
(function () {
  emailjs.init("user_XMylBXRXg6NjjmrTpanCz");
})();

// DOMs
const $findName = document.querySelector(".find-email-name");
const $emailAdress = document.querySelector(".find-email-address");
const $findNickname = document.querySelector(".find-nickname");
const $findPhoneNum = document.querySelector(".find-phone-number");
const $findSubmitBtn = document.querySelector(".find-submit-btn");
const $findCancelBtn = document.querySelector(".find-cancel-btn");
// 이메일로 보내기
$findSubmitBtn.onclick = async (e) => {
  e.preventDefault();
  const res = await fetch("/users");
  arr = await res.json();
  console.log(arr);
  let idSeeker = arr.find((user) => +user.phone === +$findPhoneNum.value);
  findId(idSeeker);

  let templateParams = {
    name: `${$findName.value}`,
    phone: `${$findPhoneNum.value}`,
    email: `${$emailAdress.value}`,
    message: `당신의 아이디는 ${idSeeker.id} 입니다.`,
  };

  emailjs.send("service_sjq6dix", "template_fxenl3o", templateParams);
};

// 아이디 탐색
const findId = async (idSeeker) => {
  if (!idSeeker) {
    return;
  }
  console.log(idSeeker.id);
};

$findCancelBtn.onclick = (e) => {
  e.preventDefault();
  location.href = "../signin.html";
};
