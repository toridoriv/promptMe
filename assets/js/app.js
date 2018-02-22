/**
 * elementos HTML que son constantemente creados de forma dinámica e interactuan con
 * los otros arhivos js
 */
const dashSectionHTML = $('#main-container').html();
const registerHTML = '<div class="register-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center div-form"><h4>Start Using Prompt Me!</h4><p>Register to save your favorite prompts and search for specific ideas!</p><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail-register" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass-register" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button type="submit" class="btn" id="btn-register">Register</button></div><div class="text-center"><span>Already Have an Account? <a href="" class="enter-login">Login!</a></span></div></form></div></div></div>';
const loginHTML = '<div class="login-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center"><h4>Login</h4><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button class="btn" type="submit" id="btn-login">Log In</button></div><div class="text-center"><span>New Around Here? <a href="" class="enter-register">Register Now!</a></span></div></form></div></div></div>';
const searchContainerHTML = '<div class="listing-prompt section"><div class="title"><h3 class="text-center" id="title-for-prompts">Random prompts for you (?</h3><hr></div><ul class="prompt-list"></ul></div>';
const loginNav = '<div class="logo col-5 col-md-2"><img src="assets/img/mini-logo.png" alt="Prompt Me" id="logo-two"></div><div class="search-container d-none d-lg-inline-block col-lg-5"><div class="input-group"><input type="text" class="form-control" placeholder="What are you looking for?" aria-label="what are you looking for?" aria-describedby="basic-addon2" class="search" id="search"><div class="input-group-append"><button class="btn btn-outline-secondary" type="button" id="search-btn"><i class="fas fa-search"></i></button></div></div></div><ul class="col-7 col-lg-5 d-none d-lg-inline-block text-right" id="login-menu"><li class="my-favorites"><i class="fas fa-bookmark"></i><span> Saved</span></li><li><i class="fas fa-cogs"></i><span> Settings</span></li><li class="btn-logout"><i class="fas fa-sign-out-alt"></i><span> Log Out</span></li></ul><ul class="col-7 col-lg-5 text-right d-lg-none" id="login-menu-xs"><li class="xs-search-btn"><i class="fas fa-search"></i></li><li class="xs-menu-btn"><i class="fas fa-bars"></i></li></ul><div class="search-menu-hide col-12 d-lg-none"><input type="text" class="form-control" placeholder="What are you looking for?" aria-label="what are you looking for?" aria-describedby="basic-addon2" id="search-hide"></div><div class="big-menu-hide col-12 d-lg-none"><ul class="d-lg-none"><li class="my-favorites"><i class="fas fa-bookmark"></i> Saved</li><li><i class="fas fa-cogs"></i> Settings</li><li class="btn-logout"><i class="fas fa-sign-out-alt"></i> Log Out</li></ul></div>';
const noLoginNav = '<div class="logo col-5 col-md-2"><img src="assets/img/mini-logo.png" alt="Prompt Me" id="logo"></div><ul class="reg-log"><li class="enter-register d-none d-md-inline-block">Register</li><li class="enter-login d-none d-md-inline-block">Log In</li><li class="d-sm-block d-md-none drop-menu-wl"><i class="fas fa-bars"></i></li></ul><ul class="hide-menu col-12 d-lg-none"><li class="enter-register col-12">Register</li><hr><li class="enter-login col-12">Log in</li></ul>';
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
        let string = $(this).val();
        $('#main-container').empty();
        $('#main-container').append(searchContainerHTML);
        $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${string}</span> prompts`)
        getPromptGenre(string);
        $(this).val('')
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

  // botones nav
    $('body').on('click', '.xs-menu-btn', function() {
      var state = $(this).data('state');
      switch (state) {
        case 1 :
        case undefined : $('.big-menu-hide').show(); $(this).data('state', 2); break;
        case 2 : $('.big-menu-hide').hide(); $(this).data('state', 1); break;
      }
  });

    $('body').on('click', '.xs-search-btn', function() {
      var state = $(this).data('state');
      switch (state) {
        case 1 :
        case undefined : $('.search-menu-hide').show(); $(this).data('state', 2); break;
        case 2 : $('.search-menu-hide').hide(); $(this).data('state', 1); break;
      }
  });
      $('body').on('click', '.drop-menu-wl', function() {
        var state = $(this).data('state');
        switch (state) {
          case 1 :
          case undefined : $('.hide-menu').show(); $(this).data('state', 2); break;
          case 2 : $('.hide-menu').hide(); $(this).data('state', 1); break;
        }
    });

  // inicializando firebase
  firebase.initializeApp(config);
  // llamando funciones
  signUp();
  login();
  realTimeListener();
});