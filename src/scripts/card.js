// Получаем Темплейт карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

// Функция создания карточки
export const createCard = (cardData, onDelete, toggleLiked, openPopup) => {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  /**  присваиваем значения элементов клонированного шаблона */
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  /** обработчик клика иконки удаления, по которому будет вызван переданный в аргументах колбэк */
  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  });

  /** обработчик клика иконки лайка, по которому будет вызван переданный в аргументах колбэк */
  likeButton.addEventListener('click', toggleLiked);

  /** обработчик клика по изображению, по которому будет вызван переданный в аргументах колбэк */
  cardImage.addEventListener('click', () => {
    openPopup(cardImage.src, cardTitle.textContent);
  });

  return cardElement;
}

// Функция-обработчик события удаления карточки
export const deleteCard = (card) => {
  card.remove();
}

// Функция-обработчик события лайка карточки
export const toggleIsLiked = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}