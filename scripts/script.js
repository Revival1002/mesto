import {initialCards} from './cards.js';
import {settings} from './validate.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link
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
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._alt || this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', openImage);
  }

}

const buttonEdit = document.querySelector('.profile__info-edit'),
      buttonAdd = document.querySelector('.profile__add-button'),
	    buttonsClose = document.querySelectorAll('.popup__close'),
	    nameInput = document.querySelector('.popup__form-input[name="name"]'),
	    descriptionInput = document.querySelector('.popup__form-input[name="description"]'),
	    nameText = document.querySelector('.profile__info-name'),
	    descText = document.querySelector('.profile__info-description'),
      imageTitle = document.querySelector('.popup__form-input[name="title"]'),
      imageLink = document.querySelector('.popup__form-input[name="image"]'),
	    formSave = document.querySelector('#popup__profile'),
      imageFormSave = document.querySelector('#popup_add-image'),
      imagePopupFullImage = document.querySelector('.popup__full-image'),
      cardsContainer = document.querySelector('.elements'),
      popupEditProfile = document.querySelector('.popup_edit-profile'),
      popupAddImage = document.querySelector('.popup_add-image'),
      popupFullscreen = document.querySelector('.popup_fullscreen'),
      popupSubTitle = document.querySelector('.popup__subtitle'),
      overlays = document.querySelectorAll('.popup__overlay');

initialCards.forEach(function(item) {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();

    cardsContainer.prepend(cardElement);
});

buttonEdit.addEventListener('click',() => {
  nameInput.value = nameText.textContent;
  descriptionInput.value = descText.textContent;
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener('click',() => {
  const inputList = Array.from(popupAddImage.querySelectorAll(`.${settings.input}`));
  const buttonElement = popupAddImage.querySelector(`.${settings.button}`);
  openPopup(popupAddImage);
  buttonElement.classList.add(settings.buttonDisabled);
  buttonElement.setAttribute('disabled', '');
});
buttonsClose.forEach(element => {
  element.addEventListener('click',() => closePopup(element.closest('.popup')));
});

formSave.addEventListener('submit', saveData);
imageFormSave.addEventListener('submit', saveImage);
overlays.forEach((item) => {
  item.addEventListener('click',(evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function saveData(evt) {
	evt.preventDefault();
  const popup = evt.target.closest('.popup');
	nameText.textContent = nameInput.value;
	descText.textContent = descriptionInput.value;
	closePopup(popup);
}

function saveImage(evt) {
  evt.preventDefault();
  const item = {
    name: imageTitle.value,
    alt: imageTitle.value,
    link: imageLink.value
  }
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();
  const popup = evt.target.closest('.popup');
  cardsContainer.prepend(cardElement);
  imageFormSave.reset();
  closePopup(popup);
}

function openImage(evt) {
  const target = evt.target,
        title = target.closest('.element').querySelector('.element__title').textContent;
  imagePopupFullImage.src = target.src;
  if (target.alt == '') {
    imagePopupFullImage.alt = title;
  } else {
    imagePopupFullImage.alt = target.alt;
  }

  popupSubTitle.textContent = title;
  openPopup(popupFullscreen);
}

