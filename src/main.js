//eventos de DO

var config = {
    apiKey: "AIzaSyAylC42T8eTT0b7dsg082rrZLf1ooaxwj4",
    authDomain: "red-social-dolce.firebaseapp.com",
    databaseURL: "https://red-social-dolce.firebaseio.com",
    storageBucket: "red-social-dolce.appspot.com",
};
firebase.initializeApp(config);

const mail = document.getElementById("mail");
const register = document.getElementById("register");
const password = document.getElementById("password");
const login = document.getElementById("button-login");
const mailLogin = document.getElementById("mail-login");
const passLogin = document.getElementById("password-login");
const logoGoogle = document.getElementById("logo-google");
const logOut = document.getElementById("log-out");


if (location.pathname === "/src/views/registro.html") {
  register.addEventListener("click", () => {
      const mailUser = mail.value;
      const passwordUser = password.value;
      console.log(mailUser, passwordUser)
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(mailUser, passwordUser);
      promise
          .catch(e => alert(e.message));

  });
}else if (location.pathname === "/src/views/muro.html"){

  
logOut.addEventListener('click', () =>{
  alert("si funciono");
  firebase.auth().signOut();
  location.replace('../index.html');
})

}else{
  login.addEventListener("click", () => {
    const mailUser = mailLogin.value;
    const passwordUser = passLogin.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(mailUser, passwordUser);
     promise
     .then(location.replace("views/muro.html"))
     .catch(e => alert(e.message));
});       

logoGoogle.addEventListener("click", () => {
  alert("Si funciono");
  const baseProvider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(baseProvider)
  .catch (e => console.log(e.message));
  
})
}

  

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if(!location.href.match(/muro.html$/gm)){
        location.replace('views/muro.html');
      } 
    } else {
        alert("No reegistrado");
        
    }
})