/**
 * elementos HTML que son constantemente creados de forma dinámica e interactuan con
 * los otros arhivos js
 */
const dashSectionHTML = $('#main-container').html();
const registerHTML = '<div class="register-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center div-form"><h4>Start Using Prompt Me!</h4><p>Register to save your favorite prompts and search for specific ideas!</p><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail-register" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass-register" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button type="submit" class="btn" id="btn-register">Register</button></div><div class="text-center"><span>Already Have an Account? <a href="" class="enter-login">Login!</a></span></div></form></div></div></div>';
const loginHTML = '<div class="login-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center"><h4>Login</h4><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button class="btn" type="submit" id="btn-login">Log In</button></div><div class="text-center"><span>New Around Here? <a href="" class="enter-register">Register Now!</a></span></div></form></div></div></div>';
const searchContainerHTML = '<div class="listing-prompt section"><div class="title"><h3 class="text-center" id="title-for-prompts">Random prompts for you (?</h3><hr></div><ul class="prompt-list"></ul></div>';
const loginNav = '<div class="logo col-5 col-md-2"><img src="assets/img/mini-logo.png" alt="Prompt Me" id="logo-two"></div><div class="search-container d-none d-lg-inline-block col-lg-5"><div class="input-group"><input type="text" class="form-control" placeholder="What are you looking for?" aria-label="what are you looking for?" aria-describedby="basic-addon2" id="search"><div class="input-group-append"><button class="btn btn-outline-secondary" type="button" id="search-btn"><i class="fas fa-search"></i></button></div></div></div><ul class="col-7 col-lg-5 text-right" id="login-menu"><li class="d-lg-none button-search"><i class="fas fa-search"></i></li><li class="my-favorites"><i class="fas fa-heart"></i> <span class="d-none d-lg-inline-block">Favorites</span></li><li><i class="fas fa-cogs"></i> <span class="d-none d-lg-inline-block">Settings</span></li><li id="btn-logout"><i class="fas fa-sign-out-alt"></i> <span class="d-none d-lg-inline-block">Log Out</span></li></ul><div class="mini-search-container col-12"><div class="input-group"><input type="text" class="form-control" placeholder="What are you looking for?" aria-label="What are you looking for?" aria-describedby="basic-addon2" id="search"><div class="input-group-append"><button class="btn btn-outline-secondary" type="button" id="search-btn"><i class="fas fa-search"></i></button></div></div></div>';
const noLoginNav = '<div class="logo col-5 col-md-2"><img src="assets/img/mini-logo.png" alt="Prompt Me" id="logo"></div><ul class="reg-log"><li class="enter-register">Register</li><li class="enter-login">Log In</li></ul>';
const tags = '<div class="col-12 col-md-10 offset-md-1 tags-container"><p>Or click on a tag:</p><a href="#" class="badge badge-dark tag" id="drama">#Drama</a><a href="#" class="badge badge-dark tag" id="angst">#Angst</a><a href="#" class="badge badge-dark tag" id="fluff">#Fluff</a><a href="#" class="badge badge-dark tag" id="comedy">#Comedy</a><a href="#" class="badge badge-dark tag" id="romance">#Romance</a><a href="#" class="badge badge-dark tag" id="superheroes">#Superheroes</a><a href="#" class="badge badge-dark tag" id="scifi">#Sci-fi</a><a href="#" class="badge badge-dark tag" id="au">#Alternative Universe</a><a href="#" class="badge badge-dark tag" id="pairing">#Pairing</a></div>';

$(document).ready(function() {
  // buscando un prompt aleatorio para mostrar en inicio
  getRandomPrompt();
  // click en registro
  $('body').on('click', '.enter-register', function(e) {
    e.preventDefault();
    $('#main-container').empty();
    $('#main-container').append(registerHTML);
    $(window).scrollTop(0);
  });
  // click en login
  $('body').on('click', '.enter-login', function(e) {
    e.preventDefault();
    $('#main-container').empty();
    $('#main-container').append(loginHTML);
    $(window).scrollTop(0);
  })
  //click en el logo
  $('nav').on('click', '#logo', function() {
    let first =$('#main-container').children()[0];
    if ($(first).hasClass('register-s') || $(first).hasClass('login-s')) {
      $('#main-container').empty();
      $('#main-container').append(dashSectionHTML);
      getRandomPrompt();
      $(window).scrollTop(0);
    }
  })
  // click en el logo con loginNav
  $('nav').on('click', '#logo-two', function() {
    $('#main-container').empty();
    $('#main-container').append(searchContainerHTML);
    getRandomPrompts();
    $(tags).insertAfter($('#main-container .title'));
    $(window).scrollTop(0);
  })
  // click al botón de búsqueda
  $('nav').on('click', '#search-btn', function() {
    $(window).scrollTop(0);
    let string = $('#search').val();
    $('#main-container').empty();
    $('#main-container').append(searchContainerHTML);
    $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${string}</span> prompts`)
    getPromptGenre(string);
    $('#search').val('')
  })
  // o enter al buscar
  $("nav").on("keydown", 'input', function(event) {
      if(event.keyCode == 13) {
        $(window).scrollTop(0);
        let string = $('#search').val();
        $('#main-container').empty();
        $('#main-container').append(searchContainerHTML);
        $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${string}</span> prompts`)
        getPromptGenre(string);
        $('#search').val('')
      }
  });
  // click búsqueda en dispositivos pequeños
  $('nav').on('click', '.button-search', function() {
    $('.mini-search-container').show();
  })
  // click a un tag
  $('#main-container').on('click', '.tag', function(e) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    let str = $(this).attr('id');
    let title = $(this).html();
    title = title.split('#')[1];
    console.log(str)
    $('#main-container').empty();
    $('#main-container').append(searchContainerHTML);
    getPromptGenre(str);
    $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${title}</span> prompts`)
    $(tags).insertAfter($('#main-container .title'));
    $(window).scrollTop(0);
  })

  // inicializando firebase
  firebase.initializeApp(config);
  // llamando funciones
  signUp();
  login();
  realTimeListener();
});