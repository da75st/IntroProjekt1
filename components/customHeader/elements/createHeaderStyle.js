export function createHeaderStyle() {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', './components/customHeader/elements/headerStyle.css')
  return link
}