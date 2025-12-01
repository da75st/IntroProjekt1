// Hämta HTML-element som används för att visa fråga och navigera i quizet
const questionElement = document.getElementById('questionText');
const answerLabels = document.querySelectorAll('#answerButton label')
const nextBtn = document.getElementById('nextbtn')
const nextBtnID = nextBtn.id
const nextBtnText = nextBtn.textContent
const backBtn = document.getElementById('backbtn')
const backBtnID = backBtn.id


// Håller reda på vilken fråga användaren befinner sig på och poäng
let currentQuestionIndex = 0;
// Lista med alla frågar
const questions = [
    {
        "question": "1. Välj det alternativ som beskriver saker i hemmet som kan automatisera med hjälp IoT.",
        "answers": [
            {"text":"Automatisera vädret utomhus", "correct": false},
            {"text":"Styra belysning i hemmet", "correct": true},
            {"text":"Styra trafikljusen i kvarteret", "correct": false},
            {"text":"Ändra gravationen i källaren", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "2. Välj en teknik som har stor påverkan på att minska klimatutsläpp.",
        "answers": [
            {"text":"Mönsteringenkänning av rutiner", "correct": true},
            {"text":"Virtuell i vidoesamtal", "correct": false},
            {"text":"3D-effekter i mobilspel", "correct": false},
            {"text":"Snabbare skrivare för kontor", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "3. Hur kan smart hemteknik användas för att göra resursanvändingen mer effektiv i hemmet?",  
        "answers": [
            {"text":"Öka strömförbrukningen med fler lampor", "correct": false},
            {"text":"Slå på alla apparater samtidigt", "correct": false},
            {"text":"Mönsterigenkänning", "correct": true},
            {"text":"Lämna fönster öppna när värmen är på", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "4. Hur många procent av de globala koldioxidutsläppen står IT-sektorn för?",
        "answers": [
            {"text":"10%", "correct": false},
            {"text":"23%", "correct": false},
            {"text":"2%", "correct": true},
            {"text":"7%", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "5. Hur kan AI bidra till att minska marin föroening enligt FN:s hållbarhetsmål?",
        "answers": [
            {"text":"AI kan rena vattnet direkt genom kemiska processer", "correct": false},
            {"text":"AI kan identifiera oljeläckage i havet via satellitbilder", "correct": true},
            {"text":"AI kan stoppa oljeutsläpp genom att flytta oljan automatiskt", "correct": false},
            {"text":"AI kan ändra havsströmmar för att sprida kemikalier", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "6. På vilket sätt kan AI förbättra effektiviten i energisystem och öka användinen av förnybar energi?",
        "answers": [
            {"text":"AI kan förutsäga elproduktionen från vind- och solkraft genom analys av väderdata och satellitdata", "correct": true},
            {"text":"AI kan skapa energi från tomma ytor utan sol eller vind", "correct": false},
            {"text":"AI kan stänga av alla fossila bränslen utan energibrist", "correct": false},
            {"text":"AI kan lagra energi i väderförhållanden som inte existerar", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "7. Varför är AI särskillt effektiv för miljöanalys jämfört med manuell databehandling.",
        "answers": [
            {"text":"AI kan läsa tankar för att förutsäga miljöpåverkan", "correct": false},
            {"text":"AI kan analysera data utan att faktiskt ha någon datakälla", "correct": true},
            {"text":"AI kan lagra stora mängder data", "correct": false},
            {"text":"AI kan hantera, analysera enomra datamängder", "correct": true}
        ],
        "currentGuess": null
    },
    {
        "question": "8. Hur har BiTorrent minskat energiförbrukningen i sin fildelningsprocess. ",
        "answers": [
            {"text":"Genom att stoppa all fildelning helt", "correct": false},
            {"text":"Genom att tvinga alla användare att stänga av sina datorer under natten", "correct": false},
            {"text":"Genom en proxy-arkitektur som övertar största delan av fildelningen", "correct": true},
            {"text":"Genom att öka CPU-användingen för att påskynda nedladdningar", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "9. Vilken åtgärd inom Grön IT bidrar till minskad energiförbrukning i program som Zoom?",
        "answers": [
            {"text":"Alla användare uppmandes att stänga av sina datorer permanent", "correct": false},
            {"text":"Onödiga automatiska funktioner togs bort, vilket minskade energianvändningen utan att påverka funktionaliteten", "correct": true},
            {"text":"Programmet installeraddes på flera datorer för snabbare nedladdning", "correct": false},
            {"text":"Zoom började använda mer CPU-kraft för att öka hastigheten", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "10. Vilken åldersgrupp av kvinnor köper/beställer flest varor/tjänster via internet.",
        "answers": [
            {"text":"16-24 år", "correct": false},
            {"text":"55-64 år", "correct": false},
            {"text":"45-54 år ", "correct": false},
            {"text":"25-34 år", "correct": true}
        ],
        "currentGuess": null
    }
]
// Visar aktuell fråga och alternativen
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    const radiobuttons = document.querySelectorAll('#answerButton input[type="radio"]')

    for (let i = 0; i < answerLabels.length; i++) {
        const question = questions[currentQuestionIndex]
        const currentGuess = question.currentGuess
        const answerText = question.answers[i].text

        answerLabels[i].querySelector('p').textContent = answerText
        
        // Markerar tidigare val
        radiobuttons[i].checked = answerText === currentGuess
    }
    updateNavigationButtons(currentQuestionIndex) 
}
// Uppdaterar knapparna beronde på vilken fråga man är på
function updateNavigationButtons(currentQuestionIndex) {
    // Inaktivera back-btn
    if (currentQuestionIndex === 0) {
        backBtn.classList.add('disabled-btn')
        backBtn.disabled = true
        // Next blir till submit i slutet
    } else if (currentQuestionIndex === 9) {
        nextBtn.textContent = 'Submit'
        nextBtn.id = 'submit-btn'
        nextBtn.addEventListener('click', handleSubmit)
        // Återställer till orginal
    } else {
        backBtn.classList.remove('disabled-btn')
        backBtn.disabled = false
        nextBtn.textContent = nextBtnText
        nextBtn.id = nextBtnID
        nextBtn.removeEventListener('click', handleSubmit)
     }
}
// Körs när quizet skickas in 
function handleSubmit() {
    showResult()
    location.href = getProjectRoot() + '/index.html'
}
// Sparar användarens svar på aktuell fråga
function updateAnswer() {
    const answerElement = document.querySelector('#answerButton input[type="radio"]:checked ~ p')
    const answerText = answerElement ? answerElement.textContent : null
    questions[currentQuestionIndex].currentGuess = answerText
}
// Kontrollerar om svaret är korrekt
function guessIsCorrect(question){
    const currentGuess = question.currentGuess
    const answers = question.answers

    const selectedAnswer = answers.filter((answer) => answer.text === currentGuess)[0];

    if (selectedAnswer && selectedAnswer.correct === true) {
        return true
    } else {
        return false
    }  
}
// Räknar ut totalpoäng
function calculateScore() {
    const resultsArray = questions.map(guessIsCorrect)
    const score = resultsArray.filter((boolean) => boolean === true).length
    return score
}
// Går till nästa fråga
function nextQuestion(){
    updateAnswer()
    currentQuestionIndex++
    showQuestion()
}
// Går tillbaka 
function backQuestion(){
    updateAnswer()
    currentQuestionIndex--
    showQuestion()    
}
// Visar resultat i en alert
function showResult(){
    alert(`Your score was: ${calculateScore()} / ${questions.length}`)                                  
}

  // Helper: gets the project root so that relative paths can be used while being served as a file://
function getProjectRoot() {
    const href = location.href;
    const PROJECT_FOLDER = 'IntroProjekt1'
    const alertMsg = `
The website uses a web component as the header and as such is reliant on you to either load the website as a file (file:///) or so that the location.origin is valid.

This is because the header (which is reused in every subpage) needs a consistant way to link to other subpages and no webserver was allowed in the project.

(The root folder must be named exactly ${PROJECT_FOLDER})
    `;

    // If loaded as a file return the path
    if (href.startsWith("file://")) {
        const idx = href.indexOf(`/${PROJECT_FOLDER}/`);
        if (idx !== -1) {
            return href.slice(0, idx + PROJECT_FOLDER.length + 1);
        }
        alert(alertMsg);
        return null;
    }

    // If loaded as http, return the origin
    if (location.origin && location.origin !== "null") {
        return location.origin;
    } else {
        alert(alertMsg);
        return null;
    }
}
// Event listeners för knappar
nextBtn.addEventListener('click', nextQuestion)
backBtn.addEventListener('click', backQuestion)
// Visar första frågan direkt när sidan laddas
showQuestion()
