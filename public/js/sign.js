let user = [];

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNick = document.querySelector('.signup-nick');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $input = document.querySelector('input');

const redBorder = e => {
  e.target.style.borderBottomColor = 'red';

  
}

const clearBorder = e => {
  e.target.style.borderBottomColor = '#f0f3f4';
}
$signupFieldset.onkeyup = e => {
  if (e.target.matches('.signup-name')){
    let num = +$signupName.value ? redBorder(e) : e.key > 0 && e.key < 9 ? redBorder(e) : clearBorder(e); 
    console.log(num)
  }
}

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
}


$signupBtn.onclick = e => {
  e.preventDefault();
  if ($input.value === '') console.log('비었습니다.');
  writeUserData($signupId.value  , { name: $signupName.value, nickname: $signupNick.value, id: $signupId.value })
}



firebase.database().ref('users/').on('value', (snapshot) => {
  person = snapshot.val()
})