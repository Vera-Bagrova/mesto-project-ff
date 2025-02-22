const setPopupEventListeners = (popup) => {
  popup.classList.add('popup_is-animated');
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup);
  })
};

// Функция открытия попапа
const openModal = (popupElement) => {
  popupElement.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscModal);
  popupElement.addEventListener('click', handleCloseModal);
}

// Функция закрытия попапа
const closeModal = (popupElement) => {
  popupElement.classList.toggle('popup_is-opened');

  document.removeEventListener('keydown', handleEscModal);
  popupElement.removeEventListener('click', handleCloseModal);
}

// Функция-обработчик события нажатия Esc
const handleEscModal = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  };
}

// Функция-обработчик события клика по оверлею
const handleCloseModal = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  };
}

export { openModal, closeModal, setPopupEventListeners };
