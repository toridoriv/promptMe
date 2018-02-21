const config = {
  apiKey: "AIzaSyDZQIDw1GLHfGjQeQL6sMhtVV9744igLt8",
  authDomain: "promptme-app.firebaseapp.com",
  databaseURL: "https://promptme-app.firebaseio.com",
  projectId: "promptme-app",
  storageBucket: "promptme-app.appspot.com",
  messagingSenderId: "107220044807"
};


const btnReg = $('#btn-register');
const btnLog = $('#btn-login');
const inputPass = $('#input-pass');
const inputMail = $('#input-mail');
const inputPassReg = $('#input-pass-register');
const inputMailReg = $('#input-mail-register');
const btnLogOut = $('#btn-logout');
const inputNick = $('#input-nick');
// PENDIENTE: Modificar el elemento padre
const parentElement = $('#main-container');

// Creando funciones

// Función para logearse a Firebase
const login = (event) => {
  $('#main-container #btn-login').on('click', function(event) { //function(error, event)
    event.preventDefault();
    const email = inputMail.val();
    const pass = inputPass.val();
    const auth = firebase.auth();

    //Limpiando los inputs
    inputMail.val('');
    inputPass.val('');
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(error => console.log(error.message));
  });
};

// Función para registrarse en Firebase
const signUp = (event) => {
  $('#main-container #btn-register').on('click', function(event) {
    event.preventDefault();
    // POR HACER: Revisar que este input sea un email y no cualquier string
    const email = inputMailReg.val();
    const pass = inputPassReg.val();
    const auth = firebase.auth();

    //Limpiando los inputs
    inputMailReg.val('');
    inputPassReg.val('');
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(error => console.log(error.message));
  });
};

// Creando función que haga algo cuando el usuario esté loggeado
const realTimeListener = () => {
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if (firebaseUser.displayName == null) {
        firebaseUser.updateProfile({
          displayName: prompt('Name Here')
        });
      }
      // Remplazar main-container con el elemento padre
      $('#login-menu').removeClass('d-none');
      signout();
      console.log(firebaseUser.displayName);
    } else {
      console.log('not logged');
    }
  });
};

// Creando función para desloguearse

const signout = () => {
  // Remplazar main-container con el elemento padre
  $('#login-menu #btn-logout').on('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
    $('#login-menu').addClass('d-none');
  });
};