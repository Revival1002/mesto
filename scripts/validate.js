class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  enableValidation() {
    this._setEventListeners(this._form, this._settings);
  }

  _isValid(form, input, settings) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, settings);
    } else {
      this._hideInputError(form, input, settings);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(`.${this._settings.input}`));
    const buttonElement = this._form.querySelector(`.${this._settings.button}`);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(this._form, input, this._settings);
        this._toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }

  _showInputError(form, input, errorMessage, settings) {
    const formError = form.querySelector(`.${input.id}-error`);
    formError.classList.add(settings.errorClass);
    input.classList.add(settings.inputClass);
    formError.textContent = errorMessage;
  }

  _hideInputError(form, input, settings) {
    const formError = form.querySelector(`.${input.id}-error`);
    formError.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputClass);
    formError.textContent = '';
  }

  _toggleButtonState(inputs, button, settings) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(settings.buttonDisabled);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(settings.buttonDisabled);
      button.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((element) => {
      return !element.validity.valid;
    });
  }

}

export const settings = {
  form: 'popup__form',
  input: 'popup__form-input',
  button: 'popup__form-button',
  buttonDisabled: 'popup__form-button_disabled',
  errorClass: 'popup__warning_visible',
  inputClass: 'popup__form-input_invalid',
}

const formList = Array.from(document.querySelectorAll(`.${settings.form}`));
formList.forEach((form) => {
  const validation = new FormValidator(settings, form);
  validation.enableValidation();
});
