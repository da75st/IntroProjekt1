import { createStyle } from "../../../helpers/createStyle.js";

class EduDropdown extends HTMLElement {
  // Hardcoded contents of the dropdown
  static DROPDOWN_ITEMS = [
    { text: 'placeholder1', link: '#', class: 'eduItem' },
    { text: 'placeholder2', link: '#', class: 'eduItem' },
    { text: 'placeholder3', link: '#', class: 'eduItem' },
    { text: 'placeholder4', link: '#', class: 'eduItem' }
  ]
  constructor() { 
    super(); 
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    // Create shadow root and attach the dropdown <link> for the styles 
    const shadow = this.attachShadow({mode: 'open'})
    shadow.appendChild(createStyle('./components/customHeader/elements/dropdown/dropdownStyle.css'))

    // Setup the dropdown items
    let dropdownContent = ''
    for (const item of EduDropdown.DROPDOWN_ITEMS) 
      dropdownContent += `<a href=${item.link} class=${item.class}>${item.text}</a>`

    // Insert the dropdown items into the non dynamic siblings
    const outerHTML = `
      <label class="dropdown-btn" for="edu-toggle">Education</label>
      <input type="checkbox" id="edu-toggle">
      <div class="dropdown-content"> 
        ${dropdownContent}
      </div>
    `

    // Create wrapper and append the dropdown so far
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'dropdown-wrapper')
    wrapper.innerHTML = outerHTML
    shadow.appendChild(wrapper)


    // Sets instance properties up for later use
    this._checkbox = shadow.querySelector('#edu-toggle');
    this._shadow = shadow;

    // Uncheck checkbox if user clicks outside
    document.addEventListener('click', this._handleOutsideClick);
  }

  // Makes sure the event listener is removed in case the header is rerendered
  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  // unchecks the checkbox if the events composed path does not include the top shadow node 
  // (user clicked outside of the dropdown)
  _handleOutsideClick(event) {
    if (event.composedPath().includes(this._shadow)) return;
    this._checkbox.checked = false;
  }
}

// Sets up a function for ease of use when creating it
export function createEduDropdown() {
  if (!customElements.get('edu-dropdown')) {
      customElements.define('edu-dropdown', EduDropdown)
  }
  return document.createElement('edu-dropdown')
}