let perons = [];

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNink = document.querySelector('.signup-nink');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $input = document.querySelector('input');

$signupBtn.onclick = e => {
  e.preventDefault();
  if ($input.value === '') console.log('비었습니다.');

  writeUserData($signupId.value  , { name: $signupName.value, ninkname: $signupNink.value, id: $signupId.value })
}


// db


firebase.database().ref('users/').on('value', (snapshot) => {
  person = snapshot.val()
})


// // storage

// let defaultStorage = firebase.storage();
// let storageRef = firebase.storage().ref().child('/images/');



// var file = '../image/ok.png'
// storageRef.put(file).then(function(snapshot){
//   console.log(snapshot)
  
// })

