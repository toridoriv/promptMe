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