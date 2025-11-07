/**
 * Creates and returns a <link> element that references a CSS stylesheet.
 *
 * @param {string} path - The URL or file path to the CSS file.
 * @returns {HTMLLinkElement} The created <link> element with the proper attributes.
 */
export function createStyle(path) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', path)
  return link
}
