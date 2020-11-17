

// --------------------회원가입-------------------------//

const $loginInput = document.querySelector('.login-input');
const $passInput = document.querySelector('.pass-input');
const $btnLogin = document.querySelector('.btn-login');

let data = [];

  firebase.database().ref('users/').on('child_added', (snapshot) => {
    $btnLogin.onclick = e => {
      e.preventDefault();
    data.push(snapshot.val());
    console.log(data)
    //[{id: "wjdwlgns1474", name: "정지훈", password: "zz64112491", phoneNumber: "01042288874"}]//
    
    let idArr = data.flat(2).map((item) => item.id);
    console.log(idArr)
    // {id: "wjdwlgns1474", name: "정지훈", password: "zz64112491", phoneNumber: "01042288874"}
    // if (idArr.password === $passInput.value) {
    //   console.log('성공')
    // } else {
    //   console.log('실패')
    // }

  };  
})









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

