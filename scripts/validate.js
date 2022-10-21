const showInputError = (form, input, errorMessage) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.add('popup__warning_visible');
  input.classList.add('popup__form-input_invalid');
  formError.textContent = errorMessage;
}

const hideInputError = (form, input) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.remove('popup__warning_visible');
  input.classList.remove('popup__form-input_invalid');
  formError.textContent = '';
}

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__form-input'));
  const buttonElement = form.querySelector('.popup__form-button');

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    setEventListeners(form);
  });
}

const hasInvalidInput = (inputs) => {
  return inputs.some((element) => {
    return !element.validity.valid;
  });
}

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add('popup__form-button_disabled');
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove('popup__form-button_disabled');
    button.removeAttribute('disabled');
  }
}

enableValidation();
