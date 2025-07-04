const success = document
  .querySelector("#success")
  .content.querySelector(".success");

const error = document.querySelector("#error").content.querySelector(".error");

const submitBtn = document.querySelector(".ad-form__submit");

function setCloseMethods(element) {
  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeElement();
    }
  };

  const closeElement = () => {
    element.remove();
    window.removeEventListener("keyup", handleEscape);
    submitBtn.disabled = false;
  };

  element.addEventListener("click", closeElement);
  window.addEventListener("keyup", handleEscape);
}

function showNotification(isError = false) {
  submitBtn.disabled = true;
  const message = isError ? error.cloneNode(true) : success.cloneNode(true);
  setCloseMethods(message);
  if (isError) {
    error.querySelector(".error__button").addEventListener("click", () => {
      error.remove();
    });
  }
  document.body.append(message);
}

export { showNotification };
