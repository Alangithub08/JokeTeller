const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: '5849815cdd224705a50ff4dea7b24a63',
        src: joke,
        hl: 'en-gb',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Assign One or Two Part Joke
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
        joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('whhoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);