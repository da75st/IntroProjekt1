const questionElement = document.getElementById('questionText');
const answerLabels = document.querySelectorAll('#answerButton label')
const nextBtn = document.getElementById('nextbtn')
const nextBtnID = nextBtn.id
const nextBtnText = nextBtn.textContent
const backBtn = document.getElementById('backbtn')
const backBtnID = backBtn.id



let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function importQuestions() {
    const data = await fetch('./questions.json')
    const questions = await data.json()
    return questions
}

async function showQuestion() {
    if (questions.length === 0) questions = await importQuestions(); 
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    const radiobuttons = document.querySelectorAll('#answerButton input[type="radio"]')

    for (let i = 0; i < answerLabels.length; i++) {
        const question = questions[currentQuestionIndex]
        const currentGuess = question.currentGuess
        const answerText = question.answers[i].text

        answerLabels[i].querySelector('p').textContent = answerText

        console.log(answerText, currentGuess)
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
    location.href = location.origin
}

function updateAnswer() {
    const answerElement = document.querySelector('#answerButton input[type="radio"]:checked ~ p')
    const answerText = answerElement ? answerElement.textContent : null
    questions[currentQuestionIndex].currentGuess = answerText
    console.log(questions)
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

nextBtn.addEventListener('click', nextQuestion)
backBtn.addEventListener('click', backQuestion)
showQuestion()
