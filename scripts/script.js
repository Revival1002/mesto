let editButton = document.querySelector('.profile__info-edit');
let closeButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__form-input[name="name"]');
let descriptionInput = document.querySelector('.popup__form-input[name="description"]');
let nameText = document.querySelector('.profile__info-name');
let descText = document.querySelector('.profile__info-description');

let saveForm = document.querySelector('#popup__profile');

nameInput.value = nameText.textContent;
descriptionInput.value = descText.textContent;

function togglePopup() {
	let popup = document.querySelector('.popup');
	popup.classList.toggle('popup_opened');
}

function saveData() {
	nameText.textContent = nameInput.value;
	descText.textContent = descriptionInput.value;
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveForm.addEventListener('submit', function(evt) {
	evt.preventDefault();
	saveData();
	togglePopup();
});
