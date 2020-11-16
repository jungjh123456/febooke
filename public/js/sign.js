let database = firebase.database();

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNink = document.querySelector('.signup-nink');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $input = document.querySelector('input');

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
}
$signupBtn.onclick = e => {
  e.preventDefault();
  if ($input.value === '') console.log('비었습니다.');
  writeUserData($signupId.value  , { name: $signupName.value, ninkname: $signupNink.value, id: $signupId.value })
}



firebase.database().ref('users/').on('value', (snapshot) => {
  person = snapshot.val()
})