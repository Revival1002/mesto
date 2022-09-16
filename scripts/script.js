let editButton = document.querySelector('.profile__info-edit');
let closeButton = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__form-input[name="name"]');
let descriptionInput = document.querySelector('.popup__form-input[name="description"]');
let nameText = document.querySelector('.profile__info-name');
let descText = document.querySelector('.profile__info-description');
let saveForm = document.querySelector('#popup__profile');
let popup = document.querySelector('.popup');

function togglePopup() {
	popup.classList.toggle('popup_opened');
	nameInput.value = nameText.textContent;
	descriptionInput.value = descText.textContent;
}

function saveData(evt) {
	evt.preventDefault();
	nameText.textContent = nameInput.value;
	descText.textContent = descriptionInput.value;
	togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveForm.addEventListener('submit', saveData);
