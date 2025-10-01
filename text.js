const typewriterElementOne = document.getElementById('questionOne');
const typewriterElementTwo = document.getElementById('questionTwo');
const typewriterElementThree = document.getElementById('questionThree');

const finalMessageElement = document.getElementById('finalMessage');

const reponseElementOne = document.getElementById('reponseOne');
const reponseElementTwo = document.getElementById('reponseTwo');
const reponseElementThree = document.getElementById('reponseThree');

const inputMessage = document.getElementById('message');
const btnReset = document.getElementById('reset');
const btnSubmit = document.getElementById('submit');

let typingSpeed = 120;

// Fonction pour animer du texte avec effet typewriter
function typewriterEffect(element, text, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, typingSpeed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

// Fonction pour animer une réponse avec effet typewriter
function typewriterEffectResponse(element, text) {
    let l = 0;
    element.textContent = '';
    function typing() {
        if (l < text.length) {
            element.textContent += text.charAt(l);
            l++;
            setTimeout(typing, typingSpeed);
        }
    }
    typing();
}

// Question initiale
typewriterEffect(typewriterElementOne, "> Hi, how are u ?");

// Analyse de la réponse utilisateur
function analyzeResponse(reponse) {
    const lowerCaseResponse = reponse.toLowerCase();
    const offensiveWords = ['stupid', 
    'idiot', 
    'stupid', 
    'hell', 
    'hitler',
    'caca', 
    'shut up', 
    'dick', 
    'fuck', 
    'ass', 
    'suck', 
    'hate', 
    'poop', 
    'penis', 
    'bite',
    'prout',
    'pipi',
    'cul',
    'shit'];
    const positiveKeywords = ['fine', 'good', 'great', 'awesome', 'amazing', 'excellent', 'happy', 'well'];
    const negativeKeywords = ['bad', 'terrible', 'sad', 'awful', 'unhappy'];
    const modifiers = ['not', 'no', 'never'];

    const words = lowerCaseResponse.split(' ');

    // Détection des mots offensants
    for (const word of offensiveWords) {
        if (lowerCaseResponse.includes(word)) {
            return "> Let's keep it respectful, please."; // Réponse en cas de gros mot détecté
        }
    }

    for (let i = 0; i < words.length - 1; i++) {
        if (modifiers.includes(words[i]) && positiveKeywords.includes(words[i + 1])) {
            return "> Oh no, what's wrong?";
        }
        if (modifiers.includes(words[i]) && negativeKeywords.includes(words[i + 1])) {
            return "> Oh, cool bro!";
        }
    }

    for (const keyword of positiveKeywords) {
        if (lowerCaseResponse.includes(keyword)) {
            return "> Oh, cool bro!";
        }
    }
    for (const keyword of negativeKeywords) {
        if (lowerCaseResponse.includes(keyword)) {
            return "> Oh no, what's wrong?";
        }
    }

    return "> Oh, I see. Interesting...";
}

// Gestion des questions/réponses
let questionCount = 1;

function submitMessage() {
    const reponse = inputMessage.value.trim();

    if (questionCount === 1 && reponse.length > 0) {
        typewriterEffectResponse(reponseElementOne, `> ${reponse}`);
        setTimeout(() => {
            const nextQuestion = analyzeResponse(reponse);
            typewriterEffect(typewriterElementTwo, nextQuestion);
        }, 1000);
        inputMessage.value = '';
        questionCount++;

    } else if (questionCount === 2 && reponse.length > 0) {
        typewriterEffectResponse(reponseElementTwo, `> ${reponse}`);
        setTimeout(() => {
            typewriterEffect(typewriterElementThree, "> Alright, I see...");
        }, 1000);
        inputMessage.value = '';
        questionCount++;

    } else if (questionCount === 3 && reponse.length > 0) {
        typewriterEffectResponse(reponseElementThree, `> ${reponse}`);
        setTimeout(() => {
            typewriterEffect(finalMessageElement, "> Goodbyeeee!");
        }, 1000);
        inputMessage.value = '';
    } else {
        if (reponse.length === 0) {
            inputMessage.value = '';
        }
    }
}

// Réinitialise la conversation
function resetMessage() {
    questionCount = 1;
    typewriterElementOne.textContent = '';
    typewriterElementTwo.textContent = '';
    typewriterElementThree.textContent = '';
    finalMessageElement.textContent = '';
    reponseElementOne.textContent = '';
    reponseElementTwo.textContent = '';
    reponseElementThree.textContent = '';
    inputMessage.value = '';
    typewriterEffect(typewriterElementOne, "> Hi, how are u ?");
}

// Ajout des événements
btnSubmit.addEventListener('click', submitMessage);

inputMessage.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitMessage();
    }
});

btnReset.addEventListener('click', resetMessage);
