import { createDropdownStyle } from "./createDropdownStyle.js";

class EduDropdown extends HTMLElement {
  
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
    const shadow = this.attachShadow({mode: 'open'})
    shadow.appendChild(createDropdownStyle())

    let dropdownContent = ''
    for (const item of EduDropdown.DROPDOWN_ITEMS) 
      dropdownContent += `<a href=${item.link} class=${item.class}>${item.text}</a>`

    const outerHTML = `
      <label class="dropdown-btn" for="edu-toggle">Education</label>
      <input type="checkbox" id="edu-toggle">
      <div class="dropdown-content"> 
        ${dropdownContent}
      </div>
    `

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'dropdown-wrapper')
    wrapper.innerHTML = outerHTML
    shadow.appendChild(wrapper)

    this._checkbox = shadow.querySelector('#edu-toggle');
    this._shadow = shadow;

    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick(event) {
    if (event.composedPath().includes(this._shadow)) return;
    this._checkbox.checked = false;
  }
}

export function createEduDropdown() {
  if (!customElements.get('edu-dropdown')) {
      customElements.define('edu-dropdown', EduDropdown)
  }
  return document.createElement('edu-dropdown')
}