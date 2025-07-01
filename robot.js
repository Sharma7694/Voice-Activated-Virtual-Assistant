let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    console.log("Speaking:", text);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello sir, what can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant");
    } else if (message.includes("open youtube")) {
        speak("opening youtube...");
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("opening facebook...");
        window.open("https://facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("opening instagram...");
        window.open("https://instagram.com", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp...");
        window.open("https://web.whatsapp.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("opening calculator...");
        window.open("calculator://", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}

