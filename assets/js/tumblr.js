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

// Genera un número random de 0 a 20
const randomNumber = (array) => {
  return Math.floor((Math.random() * array.length));
};

// Esta función filtra prompts para que sólo recibamos aquellas que son tipo texto y tienen menos de 1000 caracteres
const filterTypeText = arr => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === 'text'&& arr[i].body.length < 1000) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};