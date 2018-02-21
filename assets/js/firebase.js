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
const btnLogOut = $('#btn-logout');
const inputNick = $('#input-nick');
// PENDIENTE: Modificar el elemento padre
const parentElement = $('#main-container');

// Creando funciones

// Función para logearse a Firebase
const login = (event) => {
  $('#main-container').on('click', '#btn-login', function(event) { //function(error, event)
    event.preventDefault();
    console.log('hola');
    const inputPass = $('#input-pass');
    const inputMail = $('#input-mail');
    const email = inputMail.val();
    const pass = inputPass.val();
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then(() => {
        //Limpiando los inputs
        inputMail.val('');
        inputPass.val('');
        // pasando a inicio con login :D
        $('nav').empty();
        $('nav').append(loginNav);
        $('#main-container').empty();
        $('#main-container').append(searchContainerHTML);
        getRandomPrompts();
        $(window).scrollTop(0);
        signout();
      })
      .catch(error => console.log(error.message));
  });
};

// Función para registrarse en Firebase
const signUp = (event) => {
  $('#main-container').on('click', ' #btn-register', function(event) {
    event.preventDefault();
    const inputPassReg = $('#input-pass-register');
    const inputMailReg = $('#input-mail-register');
    // POR HACER: Revisar que este input sea un email y no cualquier string
    const email = inputMailReg.val();
    const pass = inputPassReg.val();
    const auth = firebase.auth();
    //Limpiando los inputs
    inputMailReg.val('');
    inputPassReg.val('');
    // mostrando mensaje de éxito
    $('form').empty();
    $('form').append('<p class="text-center">Registro Completo, ya puedes iniciar sesión.</p>');
    $(window).scrollTop(0);
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
      // Al conectarse el usuario, inmediatamente se obtiene el número de marcadores
      getChildNumber(firebaseUser);
      // Remplazar main-container con el elemento padre
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
  $('#login-menu').on('click', '#btn-logout', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
    // pasando a inicio sin login :(
    $('nav').empty();
    $('nav').append(noLoginNav);
    $('#main-container').empty();
    $('#main-container').append(dashSectionHTML);
    getRandomPrompt();
    $(window).scrollTop(0);
    // terminando de pasar a inicio sin login
  });
};

// REALTIME DATABASE

// Función que obtiene el número de marcadores del usuario
const getChildNumber = (firebaseUser) => {
  const database = firebase.database();
  var ref = database.ref(`users/${firebaseUser.uid}/`);
  ref.child('saved').on('value', function(snapshot) {
    let pos = snapshot.numChildren();
    saveFavs(firebaseUser, pos);
  });
};

// La función anterior nos manda a esta. Se le entrega el número de marcadores como parámetro y se establece
// como nuevo parámetro esa cantidad más uno
const saveFavs = (firebaseUser, pos) => {
  $('.container .par').on('click', function() {
    let toSave = $(this).text().trim();
    const database = firebase.database();
    var ref = database.ref(`users/${firebaseUser.uid}/saved/`);
    var obj = {};
    obj[pos+1] = toSave;
    ref.update(obj)
    .then(() => {
      setTimeout(() => {
        location.reload();
      }, 500);
    })
    .catch(function(error) {
      console.log(error);
    });
  });
};

const showFavs = (firebaseUser) => {
  const database = firebase.database();
  let userID = firebaseUser.uid;
  return database.ref(`users/${userID}`).once('saved').then(function(snapshot) {
    console.log(snapshot.val());
  });
};