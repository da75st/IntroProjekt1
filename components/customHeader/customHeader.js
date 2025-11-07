import { createHeaderStyle } from './elements/createHeaderStyle.js';
import { createEduDropdown } from './elements/dropdown/createEduDropdown.js'
import { createLogotype } from './elements/createLogotype.js';
import { createQuizLink } from './elements/createQuizLink.js';

class CustomHeader extends HTMLElement {
  constructor() { super(); }
  
  connectedCallback() {

    // Create a shadow root/DOM§
    const shadow = this.attachShadow({mode: 'open'})
    shadow.appendChild(createHeaderStyle())

    // Create the Element
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')
    wrapper.appendChild(createLogotype())
    wrapper.appendChild(createEduDropdown())
    wrapper.appendChild(createQuizLink())

    // Append to shadow DOM
    shadow.appendChild(wrapper)
  }
}

customElements.define('custom-header', CustomHeader)