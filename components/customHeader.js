// --- Custom header ---
(function () {

  // CSS
  const headerCSS = `
    /* Remove default link styling */
    * {
      color: inherit;
      text-decoration: inherit;
    }

    /* Use grid to section the contents of the wrapper */
    .wrapper {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr;
      gap: 15px;

      border: 1px solid black;
      align-items: center;

      min-height: 4rem;
    }

    /* Makes sure the quiz link/button text is centered and responds to user interaction */
    .quiz-link {
      display: grid;
      height: 100%;
      min-width: 4rem;
      align-items: center;
      justify-items: center;

      border: 1px solid black;
    }
    .quiz-link:hover {
      background-color: rgb(226, 226, 226);
    }

    /* Position Logotype */
    .logotype-wrapper {
      display: flex;
    }
    .logotype {
      margin: auto 0;
      height: 3rem;
    }

    /* - */
    .logotype:hover {
      cursor: pointer;
    }
  `

  const dropdownCSS = `
    /* Doesn't work for safari... */
    * { user-select: none; }

    /* Remvoes default styling for "a" elements */
    * {
      color: inherit;
      text-decoration: inherit;
    }

    /* 
    The checkbox is used as a native way to have a "on and off" state system that you can 
    target with CSS. But since input elements are difficult to style we hide it and instead
    create a label that we style as a button that the user will be interacting with as a replacement. 
    */
    input[type="checkbox"] { display: none; }
    input[type="checkbox"]:checked ~ .dropdown-content { display: grid; }

    /* Hidden by default, see above how it is shown */
    .dropdown-content {
      display: none;
      gap: 10px;

      /* Make sure content is centered (x-axis) in respect to the parent */
      position: absolute;
      left: 50%;
      transform: translate(-50%);

      /* Color... */
      background-color: white;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);

      /* Make sure it is in the front of any other element */
      z-index: 1;
    }
    .dropdown-content a:hover {
      background-color: #919df9;
    }
    .eduItem {
      text-align: center;
    }

    /* Parent to .dropdown-content. Set to relative so that one can use "position: absolute" */
    .dropdown-wrapper {
      height: 100%;
      position: relative;
    }

    /* The label that acts like a button for the checkbox */
    .dropdown-btn {
      height: 50px;
      width: 6rem;
      display: grid;
      align-items: center;
      justify-items: center;
      border: 1px solid black;

      cursor: pointer;
    }
    .dropdown-btn:hover {
      background-color: rgb(226, 226, 226);
    }
  `

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

  // Helper: createStyle - create a <style> element from the supplied cssText
  function createStyle(cssText) {
    const style = document.createElement('style')
    style.textContent = cssText
    return style
  }

  // Helper: createLogotype (returns a node with an SVG in a wrapper)
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

    // onclick: return to the origin 
    // a.k.a return to "protocol://domain.tld:port/""
    svg.onclick = function () { location.href = getProjectRoot() + '/index.html' }
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

  // Helper: createEduDropdown (defines and returns an <edu-dropdown> node)
  function createEduDropdown() {
    if (!customElements.get('edu-dropdown')) {
      class EduDropdown extends HTMLElement {
        constructor() {
          super()
          this._handleOutsideClick = this._handleOutsideClick.bind(this)
        }

        static get DROPDOWN_ITEMS() {
          const root = getProjectRoot()
          return [
            { text: 'Energieffektivkodning', link: `${root}/pages/edu/edu1.html`, class: 'eduItem' },
            { text: 'Grön IT', link: `${root}/pages/edu/edu2.html`, class: 'eduItem' },
            { text: 'Resurshållning', link: `${root}/pages/edu/edu3.html`, class: 'eduItem' },
            { text: 'Miljöanalys', link: `${root}/pages/edu/edu4.html`, class: 'eduItem' }
          ]
        }

        connectedCallback() {
          const shadow = this.attachShadow({ mode: 'open' })
          shadow.appendChild(createStyle(dropdownCSS))

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
    static get QUIZ_LINK() { return `${getProjectRoot()}/pages/quiz/quiz.html`}
    constructor() { super() }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.appendChild(createStyle(headerCSS))

      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'wrapper')

      wrapper.appendChild(createLogotype())
      wrapper.appendChild(createEduDropdown())
      wrapper.appendChild(createQuizLink(CustomHeader.QUIZ_LINK))

      shadow.appendChild(wrapper)
    }
  }

  // Makes sure custom-header is defined as a custom element if this file is imported as a script
  if (!customElements.get('custom-header')) {
    customElements.define('custom-header', CustomHeader)
  }
})();