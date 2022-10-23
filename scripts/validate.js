const settings = {
  form: 'popup__form',
  input: 'popup__form-input',
  button: 'popup__form-button',
  buttonDisabled: 'popup__form-button_disabled',
  errorClass: 'popup__warning_visible',
  inputClass: 'popup__form-input_invalid',
}

const showInputError = (form, input, errorMessage, settings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.add(settings.errorClass);
  input.classList.add(settings.inputClass);
  formError.textContent = errorMessage;
}

const hideInputError = (form, input, settings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.remove(settings.errorClass);
  input.classList.remove(settings.inputClass);
  formError.textContent = '';
}

const isValid = (form, input, settings) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
};

const setEventListeners = (form, settings) => {
  const inputList = Array.from(form.querySelectorAll(`.${settings.input}`));
  const buttonElement = form.querySelector(`.${settings.button}`);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(`.${settings.form}`));
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

const hasInvalidInput = (inputs) => {
  return inputs.some((element) => {
    return !element.validity.valid;
  });
}

const toggleButtonState = (inputs, button, settings) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(settings.buttonDisabled);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(settings.buttonDisabled);
    button.removeAttribute('disabled');
  }
}

enableValidation(settings);
