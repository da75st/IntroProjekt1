/**
 * Creates and returns an <a> element configured as the quiz link.
 *
 * @param {string} path - The URL or path the quiz link should point to.
 * @returns {HTMLAnchorElement} The created <a> element with class "quiz-link",
 * text content "Quiz", and href set to the specified path.
 */
export function createQuizLink(path) {
    const quizLink = document.createElement('a')

    quizLink.setAttribute('class', 'quiz-link')
    quizLink.textContent = 'Quiz'
    quizLink.href = path

    return quizLink
}
