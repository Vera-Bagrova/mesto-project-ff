// Функция открытия попапа
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleCloseModal);
  document.addEventListener("click", handleCloseModal);
}

// Функция закрытия попапа
function closeModal(popupElement) {
  popupElement.classList.add("popup_is-animated");
  popupElement.classList.toggle("popup_is-opened");

  /** удаляем слушатель нажатия Esc */
  document.removeEventListener("keydown", handleCloseModal);
}

// Функция-обработчик события нажатия Esc/клика по крестику/оверлею
function handleCloseModal(evt) {
  const popupOpened = document.querySelector(".popup_is-opened");
  if (
    evt.key === "Escape" ||
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(popupOpened);
  }
}

export { openModal, closeModal };
