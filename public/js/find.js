let arr = [];
let Idseeker = [];

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

// 이메일로 보내기
$findSubmitBtn.onclick = (e) => {
  e.preventDefault();
  let templateParams = {
    name: `${$findName.value}`,
    phone: `${$findPhoneNum.value}`,
    email: `${$emailAdress.value}`,
    // message: `${$message.value}`,
  };

  findId();

  // emailjs.send("service_sjq6dix", "template_fxenl3o", templateParams);
};

// 아이디 탐색
const findId = async () => {
  const res = await fetch("/users");
  arr = await res.json();
  idSeeker = arr.find((user) => user.phone === $findPhoneNum.value);
  if (!idSeeker) {
    console.log("없음");
    return;
  }
  console.log(`메일로 당신아이디${idSeeker.id}`);
};

findId();
