class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link
    this._action = data.action;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template)
                                .content
                                .querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt || this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });

    this._element.querySelector('.element__image').addEventListener('click', this._action);
  }

}
