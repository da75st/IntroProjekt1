const questionElement = document.getElementById('questionText');
const answerLabels = document.querySelectorAll('#answerButton label')
const nextBtn = document.getElementById('nextbtn')
const nextBtnID = nextBtn.id
const nextBtnText = nextBtn.textContent
const backBtn = document.getElementById('backbtn')
const backBtnID = backBtn.id



let currentQuestionIndex = 0;
let score = 0;
const questions = [
    {
        "question": "quesiton number 1",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 2",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 3",  
        "answers": [
            {"text":"HEJ", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 4",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 5",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 6",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 7",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 8",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 9",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    },
    {
        "question": "quesiton number 10",
        "answers": [
            {"text":"answer1", "correct": false},
            {"text":"answer2", "correct": true},
            {"text":"answer3", "correct": false},
            {"text":"answer4", "correct": false}
        ],
        "currentGuess": null
    }
]

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    const radiobuttons = document.querySelectorAll('#answerButton input[type="radio"]')

    for (let i = 0; i < answerLabels.length; i++) {
        const question = questions[currentQuestionIndex]
        const currentGuess = question.currentGuess
        const answerText = question.answers[i].text

        answerLabels[i].querySelector('p').textContent = answerText

        radiobuttons[i].checked = answerText === currentGuess
    }
    updateNavigationButtons(currentQuestionIndex) 
}

function updateNavigationButtons(currentQuestionIndex) {
    if (currentQuestionIndex === 0) {
        backBtn.classList.add('disabled-btn')
        backBtn.disabled = true
    } else if (currentQuestionIndex === 9) {
        nextBtn.textContent = 'Submit'
        nextBtn.id = 'submit-btn'
        nextBtn.addEventListener('click', handleSubmit)
    } else {
        backBtn.classList.remove('disabled-btn')
        backBtn.disabled = false
        nextBtn.textContent = nextBtnText
        nextBtn.id = nextBtnID
        nextBtn.removeEventListener('click', handleSubmit)
     }
}

function handleSubmit() {
    showResult()
    location.href = getProjectRoot() + '/index.html'
}

function updateAnswer() {
    const answerElement = document.querySelector('#answerButton input[type="radio"]:checked ~ p')
    const answerText = answerElement ? answerElement.textContent : null
    questions[currentQuestionIndex].currentGuess = answerText
}

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

function calculateScore() {
    const resultsArray = questions.map(guessIsCorrect)
    const score = resultsArray.filter((boolean) => boolean === true).length
    return score
}

function nextQuestion(){
    updateAnswer()
    currentQuestionIndex++
    showQuestion()
}
function backQuestion(){
    updateAnswer()
    currentQuestionIndex--
    showQuestion()    
}

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

nextBtn.addEventListener('click', nextQuestion)
backBtn.addEventListener('click', backQuestion)
showQuestion()
