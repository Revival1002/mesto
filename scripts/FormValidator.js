class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._settings.input}`));
    this._buttonElement = this._form.querySelector(`.${this._settings.button}`);
  }

  enableValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement, this._settings)
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
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(this._form, input, this._settings);
        this._toggleButtonState(this._inputList, this._buttonElement, this._settings);
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
