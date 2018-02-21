const dashSectionHTML = $('#main-container').html();
const registerHTML = '<div class="register-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center"><h4>Start Using Prompt Me!</h4><p>Descripción breve de para qué sirve la página y para qué sirve registrarse en ella aquí.</p><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail-register" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass-register" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button type="submit" class="btn" id="btn-register">Register</button></div><div class="text-center"><span>Already Have an Account? <a href="#">Login!</a></span></div></form></div></div></div>';
const loginHTML = '<div class="login-s section"><div class="row"><div class="col-12 col-lg-8 offset-lg-2"><form action="" class="col-12 col-md-8 offset-md-2 login-form"><div class="text-center"><h4>Login</h4><hr></div><div class="mail col-12 col-md-8 offset-md-2"><label for="input-mail">Email</label><input type="email" id="input-mail" placeholder="Email" class="form-control"></div><div class="password col-12 col-md-8 offset-md-2"><label for="input-pass">Password</label><input type="password" id="input-pass" placeholder="Password" class="form-control"></div><div class="submit-button text-center col-12 col-md-8 offset-md-2"><button type="submit" class="btn" id="btn-login">Log In</button></div><div class="text-center"><span>New Around Here? <a href="#">Register Now!</a></span></div></form></div></div></div>';
const searchContainerHTML = '<div class="listing-prompt section"><div class="title"><h3 class="text-center" id="title-for-prompts">Random prompts for you (?</h3><hr></div><ul class="prompt-list"></ul></div>';

$('.prompt').on('click', '.save', function () {
  console.log('hola')
  if ($(this).hasClass('not-active')) {
    $(this).removeClass('not-active');
    $(this).html('<i class="fas fa-bookmark fa-2x marker"></i>');
    var div = $(this).parent();
    //guardar html prompt entero
    div = $(div).html()
    console.log(div);
    // guardar dato del prompt
  }
  else {
    $(this).addClass('not-active');
    $(this).html('<i class="far fa-bookmark fa-2x marker"></i>');
    var div = $(this).parent();
    div = $(div).html()
    console.log(div);
    // buscar esto en la data del usuario para borrarlo
    //var index = user["saves"].indexOf(code);
    //user["saves"].splice(index, 1);
    //console.log(user["saves"]);
  }
});


$('#enter-register').click(function() {
  $('#main-container').empty();
  $('#main-container').append(registerHTML);
})

$('#enter-login').click(function() {
  $('#main-container').empty();
  $('#main-container').append(loginHTML);
})

$('#logo').click(function() {
  $('#main-container').empty();
  $('#main-container').append(dashSectionHTML);
  getRandomPrompt();
})

getRandomPrompt();


$('nav').on('click', '#search-btn', function() {
  let string = $('#search').val();
  $('#main-container').empty();
  $('#main-container').append(searchContainerHTML);
  $('#title-for-prompts').html(`Results for <span style='text-transform: uppercase'>${string}</span> prompts`)
  let cosa = getPromptGenre(string);
  $('#search').val('')
})
