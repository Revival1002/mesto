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
      cardTemplate = document.querySelector('#card').content,
      cardsContainer = document.querySelector('.elements'),
      popupEditProfile = document.querySelector('.popup_edit-profile'),
      popupAddImage = document.querySelector('.popup_add-image'),
      popupFullscreen = document.querySelector('.popup_fullscreen'),
      popupSubTitle = document.querySelector('.popup__subtitle');
      overlays = document.querySelectorAll('.popup__overlay');

initialCards.forEach(function(item) {
    const card = makeCard(item['name'], item['link'], item['alt']);
    renderCard(card);
});

buttonEdit.addEventListener('click',() => {
  openPopup(popupEditProfile);
  nameInput.value = nameText.textContent;
  descriptionInput.value = descText.textContent;
});
buttonAdd.addEventListener('click',() => openPopup(popupAddImage));
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

document.addEventListener('keydown',(evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  const card = makeCard(imageTitle.value, imageLink.value, ''),
        popup = evt.target.closest('.popup');
  renderCard(card);
  imageFormSave.reset();
  closePopup(popup);
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

function makeCard(name, link, alt) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true),
          elementImage = cardElement.querySelector('.element__image'),
          elementTitle = cardElement.querySelector('.element__title'),
          elementLike = cardElement.querySelector('.element__like'),
          elementDelete = cardElement.querySelector('.element__delete');
    elementImage.src = link;
    elementImage.alt = alt || name;
    elementTitle.textContent = name;

    elementDelete.addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    elementLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    elementImage.addEventListener('click', openImage);
    return cardElement;
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

