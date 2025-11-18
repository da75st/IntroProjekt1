// Bundled custom header and helpers (no module syntax)
(function () {
  // Helper: createStyle
  function createStyle(path) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', path)
    return link
  }

  // Helper: createLogotype (returns a node with an SVG)
  function createLogotype() {
    const logotypeWrapper = document.createElement('div')
    const svgNS = 'http://www.w3.org/2000/svg'

    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('xmlns', svgNS)
    svg.setAttribute('viewBox', '0 0 640 640')

    const comment = document.createComment('!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.')
    svg.appendChild(comment)

    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('d', 'M535.3 70.7C541.7 64.6 551 62.4 559.6 65.2C569.4 68.5 576 77.7 576 88L576 274.9C576 406.1 467.9 512 337.2 512C260.2 512 193.8 462.5 169.7 393.3C134.3 424.1 112 469.4 112 520C112 533.3 101.3 544 88 544C74.7 544 64 533.3 64 520C64 445.1 102.2 379.1 160.1 340.3C195.4 316.7 237.5 304 280 304L360 304C373.3 304 384 293.3 384 280C384 266.7 373.3 256 360 256L280 256C240.3 256 202.7 264.8 169 280.5C192.3 210.5 258.2 160 336 160C402.4 160 451.8 137.9 484.7 116C503.9 103.2 520.2 87.9 535.4 70.7z')
    svg.appendChild(path)

    logotypeWrapper.classList = 'logotype-wrapper'
    svg.classList = 'logotype'

    svg.onclick = function () { location.href = location.origin }
    logotypeWrapper.append(svg)

    return logotypeWrapper
  }

  // Helper: createQuizLink
  function createQuizLink(path) {
    const quizLink = document.createElement('a')
    quizLink.setAttribute('class', 'quiz-link')
    quizLink.textContent = 'Quiz'
    quizLink.href = path
    return quizLink
  }

  // Helper: createEduDropdown (defines and returns an <edu-dropdown> instance)
  function createEduDropdown() {
    if (!customElements.get('edu-dropdown')) {
      class EduDropdown extends HTMLElement {
        constructor() {
          super()
          this._handleOutsideClick = this._handleOutsideClick.bind(this)
        }

        static get DROPDOWN_ITEMS() {
          return [
            { text: 'placeholder1', link: '#', class: 'eduItem' },
            { text: 'placeholder2', link: '#', class: 'eduItem' },
            { text: 'placeholder3', link: '#', class: 'eduItem' },
            { text: 'placeholder4', link: '#', class: 'eduItem' }
          ]
        }

        connectedCallback() {
          const shadow = this.attachShadow({ mode: 'open' })
          shadow.appendChild(createStyle('./components/customHeader/elements/dropdown/dropdownStyle.css'))

          let dropdownContent = ''
          for (const item of EduDropdown.DROPDOWN_ITEMS) {
            dropdownContent += `<a href=${item.link} class=${item.class}>${item.text}</a>`
          }

          const outerHTML = `\n      <label class="dropdown-btn" for="edu-toggle">Education</label>\n      <input type="checkbox" id="edu-toggle">\n      <div class="dropdown-content"> \n        ${dropdownContent}\n      </div>\n    `

          const wrapper = document.createElement('div')
          wrapper.setAttribute('class', 'dropdown-wrapper')
          wrapper.innerHTML = outerHTML
          shadow.appendChild(wrapper)

          this._checkbox = shadow.querySelector('#edu-toggle')
          this._shadow = shadow

          document.addEventListener('click', this._handleOutsideClick)
        }

        disconnectedCallback() {
          document.removeEventListener('click', this._handleOutsideClick)
        }

        _handleOutsideClick(event) {
          if (event.composedPath().includes(this._shadow)) return
          if (this._checkbox) this._checkbox.checked = false
        }
      }

      customElements.define('edu-dropdown', EduDropdown)
    }

    return document.createElement('edu-dropdown')
  }

  // CustomHeader web component (uses the helpers above)
  class CustomHeader extends HTMLElement {
    static get QUIZ_LINK() { return '#' }
    constructor() { super() }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.appendChild(createStyle('./components/customHeader/elements/headerStyle.css'))

      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'wrapper')

      wrapper.appendChild(createLogotype())
      wrapper.appendChild(createEduDropdown())
      wrapper.appendChild(createQuizLink(CustomHeader.QUIZ_LINK))

      shadow.appendChild(wrapper)
    }
  }

  if (!customElements.get('custom-header')) {
    customElements.define('custom-header', CustomHeader)
  }
})();