const questionElement = document.getElementById('questionText');
const answerLabels = document.querySelectorAll('#answerButton label')
const nextBtn = document.getElementById('nextbtn')
const backBtn = document.getElementById('backbtn')


let currentQuestionIndex = 0;

async function importQuestions() {
    const data = await fetch('./questions.json')
    const questions = await data.json()
    return questions
}

async function showQuestion() {
    const questions = await importQuestions()
    console.log(questions)
    console.log(answerLabels)

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    document.querySelectorAll('#answerButton input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });


    for (let i = 0; i < answerLabels.length; i++) {
        console.log(answerLabels[i], questions[currentQuestionIndex].answers[i].text)
        answerLabels[i].querySelector('p').textContent = questions[currentQuestionIndex].answers[i].text
    }
}

function nextQuestion(){
    currentQuestionIndex++
    showQuestion()
}

function backQuestion(){
    currentQuestionIndex--
    showQuestion()
    
}

function showResult(){
                                                                
}

nextBtn.addEventListener('click', nextQuestion)
backBtn.addEventListener('click', backQuestion)
showQuestion()