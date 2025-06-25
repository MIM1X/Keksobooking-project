function setElementText(mainMarkup, needMarkup, text) {
  mainMarkup.querySelector(needMarkup).textContent = text;
}

function setElementsState(parentClass, state = false) {
  const parent = document.querySelector(parentClass);

  parent.classList.toggle(`${parent.classList[0]}--disabled`, !state);

  for (const children of parent.children) {
    children.disabled = !state;
  }
}

export function creatMarkupFunc() {
  return {
    setElementText,
    setElementsState,
  };
}
