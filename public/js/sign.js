const obj = {};
var state = false;

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
    firebase.database().ref('users/').on('child_added', (snapshot) => {
      
      console.log(snapshot.val());
      if (nick.user.nickname === $signupNick.value) {
        state = false;
        redBorder(e);
      }
      else {
        state = true;
        obj['nickname'] = $signupNick.value;
        clearBorder(e);
      } 
    });
   
  } else if (e.target.matches('.signup-id')) {
    firebase.database().ref('users/').on('child_added', (snapshot) => {
      let data = snapshot.val();
      if (data.user.id === $signupId.value) {
        state = false;
        redBorder(e);
      }
      else {
        state = true;
        obj['id'] = $signupId.value;
        clearBorder(e);
      } 
    });

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

// if (state === false) {
//   $signupBtn.style.opacity = '0.6';
//   $signupBtn.style.cursor = 'not-allowed';
// } else if (state === true) {
//   $signupBtn.style.opacity = '1';
//   $signupBtn.style.cursor = 'pointer';
// }


$signupBtn.onclick = e => {
  e.preventDefault();
  writeUserData(obj);
}
