let perons = [];
let database = firebase.database();

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNink = document.querySelector('.signup-nink');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.singup-id');
const $input = document.querySelector('input');
console.log($signupBtn)

$signupBtn.onclick = e => {
  e.preventDefault();
  if ($input.value === '') console.log('비었습니다.');

  writeUserData($signupId.value  ,{name: $signupName.value, ninkname: $signupNink.value, id: $signupId.value })
}


// db

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
  
}

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

