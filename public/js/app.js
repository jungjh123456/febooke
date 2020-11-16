

const $signupFieldset = document.querySelector('.signup-fieldset');
const $signupName = document.querySelector('.signup-name');
const $signupNink = document.querySelector('.signup-nink');
const $signupBtn = document.querySelector('.signup-btn');
const $signupId = document.querySelector('.signup-id');
const $input = document.querySelector('input');



let perons = [];


  writeUserData($signupId.value  , { name: $signupName.value, ninkname: $signupNink.value, id: $signupId.value })
}

const $btnSignup = document.querySelector('.btn-signup');






$btnSignup.onclick = () => {
  
  location.assign('../../signup.html');
}


// db






// // storage

// let defaultStorage = firebase.storage();
// let storageRef = firebase.storage().ref().child('/images/');



// var file = '../image/ok.png'
// storageRef.put(file).then(function(snapshot){
//   console.log(snapshot)
  
// })

