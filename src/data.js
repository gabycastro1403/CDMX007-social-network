if ((location.href.match(/muro.html$/gm))) {

  const perfil = document.getElementById('perfil');
  const data = document.getElementById('data-user');

  perfil.addEventListener('click', () => {
    var db = firebase.firestore();

    const mailStorage = localStorage.getItem('mail');
    console.log(mailStorage);
    const printData = (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let dataUser = `<div>${doc.data().mail}
    <p>${doc.data().first}</p>
    </div>`
        data.insertAdjacentHTML('beforeend', dataUser);
      });
    }

    db.collection('users').where('dataUser', '==', mailStorage).get().then((querySnapshot) => {
      printData(querySnapshot);
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