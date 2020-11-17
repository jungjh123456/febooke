// --------------------회원가입-------------------------//

let arr = [];
var state = 'false';


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

  const newUser = {name: $signupName.value, id: $signupId.value, password: $signupPass.value, nickname: $signupNick.value ,phone: $signupNumber.value}

  
  const res = await fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
  });
  console.log(res)

}

const redBorder = e => {
  e.target.style.borderBottomColor = 'red';
}

const clearBorder = e => {
  e.target.style.borderBottomColor = '#f0f3f4';
}


$signupName.onkeyup = e => {
  if(+$signupName.value || !$signupName.value.trim()) {
    state = 'false';
    redBorder(e) 
  } else if (e.key > 0 && e.key < 9) {
    state = 'false';
    redBorder(e) 
  } else {
    state = 'true';
    clearBorder(e); 
  } 

  if (state === 'false') {
    $signupBtn.style.opacity = '0.6';
    $signupBtn.style.cursor = 'not-allowed';
  } else if (state === 'true') {
    $signupBtn.style.opacity = '1';
    $signupBtn.style.cursor = 'pointer';
  }
  
}


const ninkfilter = async () => {
  let nickFillter = await fetch('/users');
  arr = await nickFillter.json();
  console.log(arr);
  let nickname = arr.map(item => item.nickname);

  $signupNick.onkeyup = e => {
      if ($signupNick.value === nickname[0]) {
        console.log('중복')
        state = 'false';
        redBorder(e);
      } else if ($signupNick.value !== nickname) {
        state = 'true';
        clearBorder(e); 
      }

      if (state === 'false') {
        $signupBtn.style.opacity = '0.6';
        $signupBtn.style.cursor = 'not-allowed';
      } else if (state === 'true') {
        $signupBtn.style.opacity = '1';
        $signupBtn.style.cursor = 'pointer';
      }
  }

}


ninkfilter();
