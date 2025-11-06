export function createDropdownStyle() {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', './components/customHeader/elements/dropdown/dropdownStyle.css')
  return link
}