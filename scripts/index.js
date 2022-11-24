import {initialCards} from './cards.js';

const settings = { //Настройки для валидации
  form: 'popup__form',
  input: 'popup__form-input',
  button: 'popup__form-button',
  buttonDisabled: 'popup__form-button_disabled',
  errorClass: 'popup__warning_visible',
  inputClass: 'popup__form-input_invalid',
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

const openImage = (evt) => {
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

const formList = Array.from(document.querySelectorAll(`.${settings.form}`));
      formList.forEach((form) => {
        const validation = new FormValidator(settings, form);
        validation.enableValidation();
      });


initialCards.forEach(function(item) {
    item.action = openImage;
    cardsContainer.prepend(newCard(item, '#card'));
});

buttonEdit.addEventListener('click',() => {
  nameInput.value = nameText.textContent;
  descriptionInput.value = descText.textContent;
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener('click',() => {
  const inputList = Array.from(popupAddImage.querySelectorAll(`.${settings.input}`));
  const buttonElement = popupAddImage.querySelector(`.${settings.button}`);

  const form = popupAddImage.querySelector('.popup__form');
  console.log(form);
  const formValidation = new FormValidator(settings, form);
  formValidation.enableValidation();
  console.log(formValidation);
  openPopup(popupAddImage);
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
    link: imageLink.value,
    action: openImage
  }
  const popup = evt.target.closest('.popup');
  cardsContainer.prepend(newCard(item, '#card'));
  imageFormSave.reset();
  closePopup(popup);
}

function newCard(item, templateSelector) {
  const card = new Card(item, templateSelector);
  return card.generateCard();
}



