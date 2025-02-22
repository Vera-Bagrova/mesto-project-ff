import './pages/index.css';
import { createCard, deleteCard, countLikes } from './scripts/card.js'; 
import { openModal, closeModal, setPopupEventListeners } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js'; 
import { getUserInfo, getInitialCards, editProfile, postNewCard, deleteItem, likeItem, updateAvatar } from './scripts/api.js';

// DOM узлы
const content = document.querySelector('.content');
const profileImage = content.querySelector('.profile__image');
const cardsContainer = content.querySelector('.places__list');
const editPopupButton = document.querySelector('.profile__edit-button');
const newItemPopupButton = document.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
/** модальные окна */
const popups = document.querySelectorAll('.popup');
const updatePopup = document.querySelector('.popup_type_update');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const deletePopup = document.querySelector('.popup_type_delete');

/** форма обновления аватара и поле формы */
const formUpdate = document.forms['update-avatar'];
const avatarLinkInput = formUpdate.elements.link;

/** форма редактирования профиля и поля формы */
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

/** форма добавления карточки и поля формы */
const formNewPlace = document.forms['new-place'];
const placeInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

/** форма удаления карточки и переменные для API-запроса */
const formDelete = document.forms['delete-card'];
let deletedCardElem = '';
let deletedCardId = '';

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    // Выводим карточки на страницу
    initialCards.forEach(elem => {
      const card = createCard(elem, userInfo._id, handleDelete, handleLike, handleCardClick);

      cardsContainer.append(card);
    });
  })
  .catch(handleError);

/** объект настроек, включающий все нужные функциям валидации классы и селекторы элементов */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
  
enableValidation(validationConfig);

const handleError = (err) => {
  console.log(err); 
};

const renderLoading = (submitButton, isLoading) => {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

popups.forEach((popup) => {
  setPopupEventListeners(popup);
});

// Функция-обработчик события клика по корзине карточки
const handleDelete = (cardElem, cardId) => {
  deletedCardElem = cardElem;
  deletedCardId = cardId;
  
  openModal(deletePopup);
};

// Обработчик события отправки подтверждения удаления карточки
const handleDeleteSubmit = (evt) => {
  evt.preventDefault();

  deleteItem(deletedCardId)
    .then(() => {
      deleteCard(deletedCardElem);

      closeModal(deletePopup);
    })
    .catch(handleError);
};

// Слушатель события подтверждения удаления карточки
formDelete.addEventListener('submit', handleDeleteSubmit);

// Функция-обработчик события клика по лайку карточки
const handleLike = (count, button, data) => {
   if(button.classList.contains('card__like-button_is-active')) {
    likeItem(data._id, 'DELETE')
      .then((newData) => {
        countLikes(count, newData);
        button.classList.toggle('card__like-button_is-active');
      })
      .catch(handleError);
  } else {
    likeItem(data._id, 'PUT')
      .then((newData) => {
        countLikes(count, newData);
        button.classList.toggle('card__like-button_is-active');
      })
      .catch(handleError);
  };
};

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

// Слушатель события клика аватара пользователя
profileImage.addEventListener('click', () => {
  formUpdate.reset();
  clearValidation(updatePopup, validationConfig); 
  openModal(updatePopup);
});

// Обработчик события отправки формы обновления аватара
const handleFormUpdateSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true);

  updateAvatar(avatarLinkInput.value)
    .then((dataProfile) => {
      profileImage.style.backgroundImage = `url(${dataProfile.avatar})`;

      closeModal(updatePopup);
      formUpdate.reset();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(submitButton, false);
    });
};

// Слушатель события отправки формы обновления аватара
formUpdate.addEventListener('submit', handleFormUpdateSubmit); 

// Слушатель события клика кнопки редактирования профиля
editPopupButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(editPopup, validationConfig); 
  openModal(editPopup);
});

// Обработчик события отправки формы редактирования профиля
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true);

  editProfile({
  name: nameInput.value,
  about: jobInput.value
  })
    .then((dataProfile) => {
      profileTitle.textContent = dataProfile.name;
      profileDescription.textContent = dataProfile.about;

      closeModal(editPopup);
      formEdit.reset();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

// Слушатель события отправки формы редактирования профиля
formEdit.addEventListener('submit', handleFormEditSubmit); 

// Слушатель события клика кнопки добавления карточки
newItemPopupButton.addEventListener('click', () => {
  formNewPlace.reset(); 
  clearValidation(newCardPopup, validationConfig);
  openModal(newCardPopup);
});

// Обработчик события отправки формы добавления карточки
const handleFormCardSubmit = (evt) => { 
  evt.preventDefault(); 

  const submitButton = evt.submitter;
  renderLoading(submitButton, true);
  
  const inputData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  
  postNewCard(inputData)
    .then((newCardData) => {
      const newCard = createCard(newCardData, newCardData.owner._id, handleDelete, handleLike, handleCardClick);

      cardsContainer.prepend(newCard);

      closeModal(newCardPopup);
      formNewPlace.reset();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

// Слушатель события отправки формы добавления карточки
formNewPlace.addEventListener('submit', handleFormCardSubmit);