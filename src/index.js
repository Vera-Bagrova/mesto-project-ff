import './pages/index.css';
import { initialCards } from './scripts/cards.js'; 
import { createCard, deleteCard, toggleIsLiked } from './scripts/card.js'; 
import { openModal, closeModal } from './scripts/modal.js';

// DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const editPopupButton = document.querySelector('.profile__edit-button');
const newItemPopupButton = document.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
/** модальные окна */
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

/** форма редактирования и поля формы */
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

/** форма добавления карточки и поля формы */
const formNewPlace = document.forms['new-place'];
const placeInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

// Функция-обработчик события клика по изображению карточки
const handleCardClick = (src, name) => {
  /**  находим элементы Попапа картинки */
  const imgPopup = imagePopup.querySelector('.popup__image');
  const captionPopup = imagePopup.querySelector('.popup__caption');

  /** Присваиваем элементам окна нужные значения */
  imgPopup.src = src;
  imgPopup.alt = name;
  captionPopup.textContent = name;
  
  openModal(imagePopup);
}

// Выводим карточки на страницу
initialCards.forEach((elem) => {
  const card = createCard(elem, deleteCard, toggleIsLiked, handleCardClick);

  cardsContainer.append(card);
}); 

// Слушатель события клика кнопки редактирования профиля
editPopupButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(editPopup);
});

// Обработчик события отправки формы редактирования профиля
const handleFormEditSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
  formEdit.reset();
}

// Слушатель события отправки формы редактирования профиля
formEdit.addEventListener('submit', handleFormEditSubmit); 

// Слушатель события клика кнопки добавления карточки
newItemPopupButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// Обработчик события отправки формы добавления карточки
const handleFormCardSubmit = (evt) => { 
  evt.preventDefault(); 
  
  const newData = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(newData, deleteCard, toggleIsLiked, handleCardClick);

  cardsContainer.prepend(newCard);

  closeModal(newCardPopup);
  formNewPlace.reset();
}

// Слушатель события отправки формы добавления карточки
formNewPlace.addEventListener('submit', handleFormCardSubmit);