// Importing parts to the header
import { createStyle } from '../helpers/createStyle.js';
import { createEduDropdown } from './elements/dropdown/createEduDropdown.js'
import { createLogotype } from './elements/createLogotype.js';
import { createQuizLink } from './elements/createQuizLink.js';

class CustomHeader extends HTMLElement {
  static QUIZ_LINK = '#'
  constructor() { super(); }

  // Gets called when the element is rendered 
  connectedCallback() {

    // Create a shadow root/DOM
    const shadow = this.attachShadow({mode: 'open'})
    shadow.appendChild(createStyle('./components/customHeader/elements/headerStyle.css'))

    // Create wrapper
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')

    // Add everything to the wrapper
    wrapper.appendChild(createLogotype())
    wrapper.appendChild(createEduDropdown())
    wrapper.appendChild(createQuizLink(CustomHeader.QUIZ_LINK))

    // Add wrapper to shadow DOM
    shadow.appendChild(wrapper)
  }
}

// Define "custom-header" as a custom element one can use in a .html file as any other element. 
if (!customElements.get('custom-header')) {
    customElements.define('custom-header', CustomHeader)
}