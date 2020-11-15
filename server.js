let database = firebase.database();


// db

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
  
}
firebase.database().ref('users/').on('value', (snapshot) => {
  person = snapshot.val()
})
