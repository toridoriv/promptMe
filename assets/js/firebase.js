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
const btnLogOut = $('.btn-logout');
const inputNick = $('#input-nick');
// PENDIENTE: Modificar el elemento padre
const parentElement = $('#main-container');

// Creando funciones

// Función para logearse a Firebase
const login = (event) => {
  $('#main-container').on('click', '#btn-login', function(event) {
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
        $(tags).insertAfter($('#main-container .title'));
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
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    .then(() => {
      // Limpiando los inputs
      inputMailReg.val('');
      inputPassReg.val('');
      // mostrando mensaje de éxito
      $('form').empty();
      $('form').append(`<p class="text-center" style="font-weight:bold;">Alright, alright. That’s what I’m talkin’ about!</p><p class="text-center" style="font-weight:bold;">You're already registered and logged in :3</p>`);
      $(window).scrollTop(0);
    })
    .catch(error => {
      let errMsg = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
      $('form.col-12.col-md-8.offset-md-2.login-form').append(errMsg);
    });
  });
};

// Creando función que haga algo cuando el usuario esté loggeado
const realTimeListener = () => {
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) { // si el usuario ya está logeado
      // pasando a inicio con login :D
      $('nav').empty();
      $('nav').append(loginNav);
      $('#main-container').empty();
      $('#main-container').append(searchContainerHTML);
      getRandomPrompts();
      $(tags).insertAfter($('#main-container .title'));
      // Permitiendo guardar favoritos
      createMarker(firebaseUser);
      // Mostrando los favoritos al hacer click en... favoritos, duh xd
      appendFavs(firebaseUser);
      // terminando de pasar a inicio con login

      //$('.reg-log').remove();
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
  $('#login-menu').on('click', '.btn-logout', function(event) {
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

const saveFavs = (firebaseUser, textToSave, urlToSave) => {
  const database = firebase.database();
  var ref = database.ref(`users/${firebaseUser.uid}/saved/`);
  var obj = {
    text: textToSave,
    url: urlToSave
  };
  ref.push(obj)
    .catch(function(error) {
      console.log(error);
    });
};

const showFavs = firebaseUser => {
  const ref = firebase.database().ref(`users/${firebaseUser.uid}/saved`);
  ref.once('value', function(snapshot) {
    snapshot.forEach(child => {
      $('ul.prompt-list').append(`<li><div class="prompt-container row"><div class="prompt col-12 col-md-8 offset-md-2 vertical-align"><div class="for-border vertical-align"><figure class="col-12 col-md-3 text-center"><img src="assets/img/bookie.png" alt="book"></figure><div class="contentp col-12 col-md-8"><p class="prompt-text">${child.val().text}</p></div><span class="save"><i class="fas fa-bookmark fa-2x marker"></i></i></span><span class="url"><a href="${child.val().url}" target="_blank"><i class="fas fa-external-link-square-alt fa-2x"></i></a></span></div></div></div></li>`);
    });
  });
};

const deleteFavs = (firebaseUser, url) => {
  firebase.database().ref(`users/${firebaseUser.uid}/saved`).orderByChild('url').equalTo(url).once("value").then(function(snapshot) {
    snapshot.forEach(function(child) {
      child.ref.remove();
      console.log("Removed!");
    });
  });
};

const createMarker = firebaseUser => {
  /* click en el marcador para prompts */
  $('#main-container').on('click', '.save', function() {
    // SI QUEREMOS GUARDAR UN PROMPT
    if ($(this).hasClass('not-active')) {
      $(this).removeClass('not-active');
      $(this).html('<i class="fas fa-bookmark fa-2x marker"></i>');
      var div = $(this).parent();
      //guardar texto del prompt
      let text = $(div).children()[1];
      text = $(text).children()[0];
      text = $(text).html();
      let url = $(div).children()[3];
      url = $(url).children()[0];
      url = $(url).attr('href');
      saveFavs(firebaseUser, text, url);
    } // SI QUEREMOS BORRAR UN PROMPT
    else {
      $(this).addClass('not-active');
      $(this).html('<i class="far fa-bookmark fa-2x marker"></i>');
      var div = $(this).parent();
      //guardar url del prompt
      let url = $(div).children()[3];
      url = $(url).children()[0];
      url = $(url).attr('href');
      deleteFavs(firebaseUser, url);
      $(div).remove();
      // **** SI URL SE ENCUENTRA EN LOS FAVS DEL USER, ENTONCES
      // **** BORRAR DE LA DATA DEL USER
    }
  });
};

const appendFavs = firebaseUser => {
  $('nav .my-favorites').on('click', function() {
    $('#main-container').empty();
    $('#main-container').append(searchContainerHTML);
    showFavs(firebaseUser);
    let title = 'Your saved prompts';
    $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${title}</span> prompts`);
    let titleFavs = $('#title-for-prompts').parent();
    $(titleFavs).addClass('title-for-favs');
  });
};