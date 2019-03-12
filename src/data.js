if ((location.href.match(/muro.html$/gm))) {

  const perfil = document.getElementById('perfil');
  const data = document.getElementById('data-user');

  perfil.addEventListener('click', () => {
    var db = firebase.firestore();

    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const mailStorage = localStorage.getItem('UID');
        if (doc.id == mailStorage){ 
          console.log(doc.data())
         let dataUser = `<div><p>${doc.data().first}</p>
          <p>${doc.data().last}</p>
          <p>${doc.data().speciality}</p>
          <p>${doc.data().gender}</p>
          <p><${doc.data().mail}/p></div>`
          data.insertAdjacentHTML('beforeend',dataUser)
        }
      });
  });
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        data.innerHTML = '';
        let profileUSer = `<div>
    <img src="${profile.photoURL}">
    <p>${profile.displayName}</p>
    <p>${profile.email}</p>;
    </div>`
        data.insertAdjacentHTML('beforeend', profileUSer);
      });
    }
  })
}