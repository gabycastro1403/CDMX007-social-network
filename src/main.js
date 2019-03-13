// window.funciones = (document) => {
 window.controlador = {
 
  firebase: firebase.initializeApp(config),

  registro: ()=> {
    const register=  document.getElementById('register'); 
    register.addEventListener('click', () => {
      const mailUser = document.getElementById('mail').value;
      const passwordUser = document.getElementById('password').value;
      const nameUser =  document.getElementById('name').value;
      const lastNameUser =  document.getElementById('last-name').value;
      const specialityUser =  document.getElementById('speciality').value;
      const genderUser = document.getElementById('gender').value;
      const mailId = localStorage.setItem("mail", mailUser);
      const auth = firebase.auth();
      var db = firebase.firestore();
      const settings = { timestampsInSnapshots: true};
      db.settings(settings);
      db.collection('users').add({
          first: nameUser,
          last: lastNameUser,
          gender: genderUser,
          speciality: specialityUser,
          mail: mailUser
        })
        .then(function (docRef) {
          alert("registrado");
          localStorage.setItem('UID', docRef.id);
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
          alert('no registrado')
          console.error('Error adding document: ', error);
        })
      
      auth.createUserWithEmailAndPassword(mailUser, passwordUser);

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          if (!location.href.match('#/muro')) {
            location.replace('#/muro');

          }
        } else {
          if (location.href.match('#/muro')) {
            location.replace('#/login');
          };
        };
      });
    })
  },
 
  cerrarSesion : () => {
    const perfil = document.getElementById('perfil');
    const data = document.getElementById('data-user');
    const logOut = document.getElementById('log-out');

    logOut.addEventListener('click', () => {
      firebase.auth().signOut();
      location.replace('#/login');
    })
  
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
  },

  //} //else if ((location.pathname.match('index'))) {
  

    //console.log(location.hash)
  iniciarSesion: () => {
    const login= document.getElementById('button-login');
    const logoGoogle= document.getElementById('logo-google');
    const logoFacebok= document.getElementById('logo-fb');
    const mailLogin= document.getElementById('mail-login');
    const passLogin= document.getElementById('password-login');

    login.addEventListener('click', () => {
      console.log(location.hash)
      const mailUser = mailLogin.value;
      const passwordUser = passLogin.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(mailUser, passwordUser);
      promise
        .then(location.replace('#/muro'))
        .catch(e => alert(e.message));
    })
  

    logoGoogle.addEventListener('click', () => {
      const baseProvider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(baseProvider)
        .catch(e => console.log(e.message));
    }),

    logoFacebok.addEventListener('click', () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(function (result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    })
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          if (!location.href.match('#/muro')) {
            location.replace('#/muro');
          }
        } else {
          if (location.href.match('#/muro')) {
          }
        }
      })  
  }, 
};
