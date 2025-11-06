export function createQuizLink() {
    const LINK = '#'

    const quizLink = document.createElement('a')

    quizLink.setAttribute('class', 'quiz-link')
    quizLink.textContent = 'Quiz'
    quizLink.href = LINK

    return quizLink
}