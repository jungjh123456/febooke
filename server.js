let database = firebase.database();


// db

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
  
}
