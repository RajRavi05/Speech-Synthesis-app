// init speech-synth API

const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const body = document.querySelector("body");

// init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  //loop through the voices
  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.textContent = voice.name + "(" + voice.lang + ")";

    //set attributes
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);

    // console.log(option);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak
const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("Alreay speaking...");
    return;
  }

  if (textInput.value !== "") {
    // get speak event
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // wave
    body.style.background = "#141414 url(./img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    // speak end
    speakText.onend = (e) => {
      console.log("done speaking...");
      body.style.background = "#141414";
    };

    // speak error
    speakText.onerror = (e) => {
      console.error("Something went wrong...");
    };

    // Select voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// form submit

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// rate
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
// pitch
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));
// change voice select
voiceSelect.addEventListener("change", (e) => speak());
