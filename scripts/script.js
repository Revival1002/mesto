let editButton = document.querySelector('.profile__info-edit'),
	closeButton = document.querySelector('.popup__close'),
	nameInput = document.querySelector('.popup__form-input[name="name"]'),
	descriptionInput = document.querySelector('.popup__form-input[name="description"]'),
	nameText = document.querySelector('.profile__info-name'),
	descText = document.querySelector('.profile__info-description'),
	saveForm = document.querySelector('#popup__profile'),
	popup = document.querySelector('.popup');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveForm.addEventListener('submit', saveData);

function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = nameText.textContent;
	descriptionInput.value = descText.textContent;
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

function saveData(evt) {
	evt.preventDefault();
	nameText.textContent = nameInput.value;
	descText.textContent = descriptionInput.value;
	closePopup();
}
