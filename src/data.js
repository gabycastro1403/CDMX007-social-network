if ((location.href.match(/muro.html$/gm))){
  
  const perfil = document.getElementById("perfil");
  const data = document.getElementById("data-user");

  perfil.addEventListener("click", () => {
    var db = firebase.firestore();
  
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let dataUser=`<div>${doc.data().speciality}</div>`
        data.insertAdjacentHTML("beforeend", dataUser);

    });
});
var user = firebase.auth().currentUser;
if (user != null) {
 user.providerData.forEach(function (profile) {
   console.log("Sign-in provider: " + profile.providerId);
   console.log("  Provider-specific UID: " + profile.uid);
   console.log("  Name: " + profile.displayName);
   console.log("  Email: " + profile.email);
   console.log("  Photo URL: " + profile.photoURL);
 });
}

  })
}