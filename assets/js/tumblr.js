/**
* OAuth consumer key:
* Y7i0Sf2WGphZl5UIRFNyQERsrGifS23D7AvxW4X2cTRyCO0nQJ
* OAuth consumer secret:
* Z9GLFA7M8bMDuxo2YbmMpSk1CciXNegVbWDXyCyZCY1xrXu7zm
* MÉTODOS: https://www.tumblr.com/docs/en/api/v2#tagged-method
*/

const tumblrAPI = 'Y7i0Sf2WGphZl5UIRFNyQERsrGifS23D7AvxW4X2cTRyCO0nQJ';

// Obtiene un array de 20 prompts desde la API y luego las filtra con la nueva función
const getPromptGenre = str => {
  const promise = fetch(`https://api.tumblr.com/v2/tagged?tag=${str}-prompt&api_key=${tumblrAPI}&filter=text`);
  promise
    .then(data => data.json())
    .then(data => {
      console.log(filterTypeText(data.response));
      //insertando al dom acá
      let array = filterTypeText(data.response);
      array.forEach(function(element) {
        let content = element.body;
        let url = element.post_url;
        let spanClassNotInData = 'save not-active';
        let spanClassYesInData = 'save';
        $('ul.prompt-list').append(`<li><div class="prompt-container row"><div class="prompt col-12 col-md-8 offset-md-2 vertical-align"><div class="for-border vertical-align"><figure class="col-12 col-md-3 text-center"><img src="assets/img/bookie.png" alt="book"></figure><div class="contentp col-12 col-md-8"><p class="prompt-text">${content}</p></div><span class="save not-active"><i class="far fa-bookmark fa-2x marker"></i></span><span class="url"><a href="${url}" target="_blank"><i class="fas fa-external-link-square-alt fa-2x"></i></a></span></div></div></div></li>`);
        // ***** SI LA URL COINCIDE CON ALGUNA URL DE LA DATA
        // ---- apenddear el li con spanClassYesInData
        // ***** ELSE LA URL NO COINCIDE CON ALGUNA URL DE LA DATA
        // ---- appendear el li con spanClassNoInData
      })
      // terminando de insertar el dom
    })
    .catch(error => alert(`I'm sorry, it seems there isn't any prompt with that keyword :(`));
};

// Obteniendo prompt random para el inicio
const getRandomPrompt = () => {
  const promise = fetch(`https://api.tumblr.com/v2/tagged?tag=prompt&api_key=${tumblrAPI}&filter=text`);
  promise
    .then(data => data.json())
    .then(data => {
      //console.log(filterTypeText(data.response));
      let array = filterTypeText(data.response);
      let num = randomNumber(array);
      array = array[num];
      console.log(array);
      let content = array.body;
      let url = array.post_url;
      console.log(content);
      $('.dash-s .prompt-container p').html(content);
      $('.dash-s .prompt-container .url a').attr('href', url);
    })
    .catch(error => alert(`I'm sorry, it seems there isn't any prompt with that keyword :(`));
};

// Obteniendo varios prompt random para el inicio con login
const getRandomPrompts = () => {
  const promise = fetch(`https://api.tumblr.com/v2/tagged?tag=prompt&api_key=${tumblrAPI}&filter=text`);
  promise
    .then(data => data.json())
    .then(data => {
      //console.log(filterTypeText(data.response));
      let array = filterTypeText(data.response);
      array.forEach(function(element) {
      let content = element.body;
      let url = element.post_url;
      let spanClassNotInData = 'save not-active';
      let spanClassYesInData = 'save';
      $('ul.prompt-list').append(`<li><div class="prompt-container row"><div class="prompt col-12 col-md-8 offset-md-2 vertical-align"><div class="for-border vertical-align"><figure class="col-12 col-md-3 text-center"><img src="assets/img/bookie.png" alt="book"></figure><div class="contentp col-12 col-md-8"><p class="prompt-text">${content}</p></div><span class="save not-active"><i class="far fa-bookmark fa-2x marker"></i></span><span class="url"><a href="${url}" target="_blank"><i class="fas fa-external-link-square-alt fa-2x"></i></a></span></div></div></div></li>`);
      // ***** SI LA URL COINCIDE CON ALGUNA URL DE LA DATA
      // ---- apenddear el li con spanClassYesInData
      // ***** ELSE LA URL NO COINCIDE CON ALGUNA URL DE LA DATA
      // ---- appendear el li con spanClassNoInData
      })

    })
    .catch(error => alert(`I'm sorry, it seems there isn't any prompt with that keyword :(`));
};

// Genera un número random de 0 a 20
const randomNumber = (array) => {
  return Math.floor((Math.random() * array.length));
};

// Esta función filtra prompts para que sólo recibamos aquellas que son tipo texto y tienen menos de 1000 caracteres
const filterTypeText = arr => {
  let newArr = [];
  let avoidText = 'Image taken from';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === 'text' && arr[i].body.length < 1000 && arr[i].body.includes(avoidText) === false) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};