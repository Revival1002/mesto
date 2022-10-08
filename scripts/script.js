let editButton = document.querySelector('.profile__info-edit'),
  addButton = document.querySelector('.profile__add-button'),
	closeButton = document.querySelectorAll('.popup__close'),
	nameInput = document.querySelector('.popup__form-input[name="name"]'),
	descriptionInput = document.querySelector('.popup__form-input[name="description"]'),
	nameText = document.querySelector('.profile__info-name'),
	descText = document.querySelector('.profile__info-description'),
  imageTitle = document.querySelector('.popup__form-input[name="title"]'),
  imageLink = document.querySelector('.popup__form-input[name="image"]'),
	saveForm = document.querySelector('#popup__profile'),
  saveImageForm = document.querySelector('#popup_add-image'),
	popup = document.querySelector('.popup'),
  popups = document.querySelectorAll('.popup'),
  popupFullImage = document.querySelector('.popup__full-image'),
  popupFS = document.querySelector('.popup_fullscreen'),
  popupSubTitle = document.querySelector('.popup__subtitle');

const initialCards = [
    {
      name: 'Сан-Франциско',
      link: './images/sf.jpg',
      alt: 'Морские львы на Пирсе 39'
    },
    {
      name: 'Ланкастер (CA)',
      link: './images/killbillchurch.jpg',
      alt: 'Церковь из Убить Билла'
    },
    {
      name: 'Лас-Вегас',
      link: './images/vegas.jpg',
      alt: 'Знак на въезде в Лас-Вегас'
    },
    {
      name: 'Вид на Манхэттанский мост',
      link: './images/ny.jpg',
      alt: 'Нью-Йорк'
    },
    {
      name: 'Лос-Анджелес',
      link: './images/la.jpg',
      alt: 'Лос-Анджелес. Беверли Хиллз.'
    },
    {
      name: 'Долина монументов',
      link: './images/monumentvalley.jpg',
      alt: 'Долина монументов'
    }
  ];

initialCards.forEach(function(item) {
    addCard(item['name'], item['link'], item['alt']);
});

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
closeButton.forEach(element => {
  element.addEventListener('click', closePopup);
});

saveForm.addEventListener('submit', saveData);
saveImageForm.addEventListener('submit', saveImage);

function openPopup(evt) {
  let popupTarget = evt.target.className;
  if (popupTarget === 'profile__add-button')
  {
    popup = document.querySelector('.popup_add-image');
  } else if (popupTarget === 'profile__info-edit') {
    popup = document.querySelector('.popup_edit-profile');
  }

	popup.classList.add('popup_opened');
	nameInput.value = nameText.textContent;
	descriptionInput.value = descText.textContent;
}

function closePopup() {
  popups.forEach((item)=> {
    item.classList.remove('popup_opened');
  });
}

function saveData(evt) {
	evt.preventDefault();
	nameText.textContent = nameInput.value;
	descText.textContent = descriptionInput.value;
	closePopup();
}

function saveImage(evt) {
  evt.preventDefault();
  addCard(imageTitle.value, imageLink.value, '');
  imageTitle.value = imageLink.value = '';
  closePopup();
}

function addCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementLike = cardElement.querySelector('.element__like');
    const elementDelete = cardElement.querySelector('.element__delete');
    elementImage.src = link;
    elementImage.alt = alt;
    elementTitle.textContent = name;

    elementDelete.addEventListener('click', (evt) => {
      event.target.parentElement.remove();
    });

    elementLike.addEventListener('click', (evt) => {
      event.target.classList.toggle('element__like_active');
    });

    elementImage.addEventListener('click', openImage);
    elements.prepend(cardElement);
}

function openImage(evt) {
  let target = evt.target;
  popupFullImage.src = target.src;
  popupFullImage.alt = target.alt;
  popupSubTitle.textContent = target.closest('.element').querySelector('.element__title').textContent;
  popupFS.classList.add('popup_opened');
}

