var inputTxt = document.querySelector('#inputTxt');
var Translate = document.querySelector('#btn-translate');
var output = document.querySelector('#outputDiv');
var msg = new SpeechSynthesisUtterance();

const serverURL = '	https://api.funtranslations.com/translate/minion.json';

// getting server URL 
const getTranslationURL = (text) => {
    return serverURL + "?text=" + text;
}

// handling error 
const errorHandler = (error) => {
    console.log(error);
    alert("Sorry you have an error connecting to the server");
}

// Convert text to speech 
const textToSpeech = (text) => {
    msg.text = text;
    return window.speechSynthesis.speak(msg);
}

// on click handler 
const getDataFromAPI = () => {
    var input = inputTxt.value;
    fetch(getTranslationURL(input))
        .then(response => response.json())
        .then(json => {
            var translatedText = json.contents.translated;
            output.innerText = translatedText;
            textToSpeech(translatedText);
        })
        .catch(errorHandler);
};

Translate.addEventListener('click', getDataFromAPI);

