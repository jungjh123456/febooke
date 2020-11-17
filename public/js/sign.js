let data = [];
const obj = {};

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNick = document.querySelector('.signup-nick');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $signupPass = document.querySelector('.signup-pass');
const $input = document.querySelector('input');
const $signupPass2 = document.querySelector('.signup-pass2');
const $signupNumber = document.querySelector('.signup-number');
const redBorder = e => {
  e.target.style.borderBottomColor = 'red';

  
}

const clearBorder = e => {
  e.target.style.borderBottomColor = '#f0f3f4';
}

$signupFieldset.onkeyup = e => {

  if (e.target.matches('.signup-name')) {
    let num = +$signupName.value ? redBorder(e) : e.key > 0 && e.key < 9 ? redBorder(e) : clearBorder(e); 
    obj['name'] = $signupName.value; 
  } else if (e.target.matches('.signup-nick')) {
    firebase.database().ref('users/').on('add-child', (snapshot) => {
      data = snapshot.val();
    })
    obj['ninkname'] = $signupNick.value;
  } else if (e.target.matches('.signup-id')) {
    obj['id'] = $signupId.value;
  } else if (e.target.matches('.signup-pass')) {

  } else if (e.target.matches('.signup-pass2')) {
    let pass = $signupPass.value !== $signupPass2.value ? redBorder(e) : clearBorder(e);
    obj['password'] = $signupPass.value;
  } else if (e.target.matches('.signup-number')) {
    obj['phoneNumber'] = $signupNumber.value;
  }
}

function writeUserData(name) {
  firebase.database().ref('users/').push({
    user: name
  })
}


$signupBtn.onclick = e => {
  e.preventDefault();
  if ($input.value === '') console.log('비었습니다.');
  writeUserData(obj)
}


