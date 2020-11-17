let arr = [];
// --------------------회원가입-------------------------//

const $loginInput = document.querySelector('.login-input');
const $passInput = document.querySelector('.pass-input');
const $btnLogin = document.querySelector('.btn-login');


const logIn = async () => {
  const res = await fetch('/users')
  arr = await res.json();

  console.log(arr);
  $loginI
}

logIn();





// $btnSignup.onclick = e => {
  
//   location.assign('../../signup.html');
// }

// db






// // storage

// let defaultStorage = firebase.storage();
// let storageRef = firebase.storage().ref().child('/images/');



// var file = '../image/ok.png'
// storageRef.put(file).then(function(snapshot){
//   console.log(snapshot)
  
// })

