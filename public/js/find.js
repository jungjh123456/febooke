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
  // console.log($findSubmitBtn);
  let templateParams = {
    name: `${$findName.value}`,
    phone: `${$findPhoneNum.value}`,
    email: `${$emailAdress.value}`,
    // message: `${$message.value}`,
  };

  emailjs.send("service_sjq6dix", "template_fxenl3o", templateParams);
};
