export const toggleHidden = (...elements) => {
  elements.forEach(elem => elem.classList.toggle('hidden'));
}