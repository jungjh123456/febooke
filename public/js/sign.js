// --------------------회원가입-------------------------//

const arr = [];

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNick = document.querySelector('.signup-nick');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $signupPass = document.querySelector('.signup-pass');
const $input = document.querySelector('input');
const $signupPass2 = document.querySelector('.signup-pass2');
const $signupNumber = document.querySelector('.signup-number');



$signupBtn.onclick = async e => {
  e.preventDefault();
  const newUser = {name: $signupName.value, id: $signupId.value, password: $signupPass.value, phone: $signupNumber.value}

  const res = await fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
  });

}