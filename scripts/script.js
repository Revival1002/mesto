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
      elements = document.querySelector('.elements'),
      popupSubTitle = document.querySelector('.popup__subtitle');

initialCards.forEach(function(item) {
    const card = makeCard(item['name'], item['link'], item['alt']);
    renderCard(card);
});

buttonEdit.addEventListener('click',() => {
  openPopup('.popup_edit-profile');
  nameInput.value = nameText.textContent;
  descriptionInput.value = descText.textContent;
});
buttonAdd.addEventListener('click',() => openPopup('.popup_add-image'));
buttonsClose.forEach(element => {
  element.addEventListener('click',() => closePopup(element.closest('.popup')));
});

formSave.addEventListener('submit', saveData);
imageFormSave.addEventListener('submit', saveImage);

function openPopup(className) {
  const popup = document.querySelector(className);
  popup.classList.add('popup_opened');
}

function closePopup(target) {
  target.classList.remove('popup_opened');
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
        popup = evt.target.closest('.popup'),
        form = document.querySelector('#popup_add-image');
  renderCard(card);
  form.reset();
  closePopup(popup);
}

function renderCard(card) {
  elements.prepend(card);
}

function makeCard(name, link, alt) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true),
          elementImage = cardElement.querySelector('.element__image'),
          elementTitle = cardElement.querySelector('.element__title'),
          elementLike = cardElement.querySelector('.element__like'),
          elementDelete = cardElement.querySelector('.element__delete');
    elementImage.src = link;
    elementImage.alt = alt;
    elementTitle.textContent = name;

    elementDelete.addEventListener('click', (evt) => {
      event.target.closest('.element').remove();
    });

    elementLike.addEventListener('click', (evt) => {
      event.target.classList.toggle('element__like_active');
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
  openPopup('.popup_fullscreen');
}

