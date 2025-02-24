// Получаем Темплейт карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

// Функция создания карточки (принимает в качестве параметров данные карточки, функции обработки её событий и id текущего пользователя)
export const createCard = (cardData, currentUserId, onDelete, onLike, openPopup) => {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  /**  присваиваем значения элементов клонированного шаблона */
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  if(cardData.owner._id !== currentUserId) {
    deleteButton.remove(); 
  } else {
    /** обработчик клика иконки удаления, по которому будет вызван переданный в аргументах колбэк */
    deleteButton.addEventListener('click', () => {
      onDelete(cardElement, cardData._id);
    });
  };
  
  // проверяем наличие уже поставленного лайка пользователем
  const isLiked = cardData.likes.some((user) => user._id === currentUserId);

  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  };
  
  countLikes(likeCount, cardData);

  /** обработчик клика иконки лайка, по которому будет вызван переданный в аргументах колбэк */
  likeButton.addEventListener('click', () => {
    onLike(likeCount, likeButton, cardData);
  });

  /** обработчик клика по изображению, по которому будет вызван переданный в аргументах колбэк */
  cardImage.addEventListener('click', () => {
    openPopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// Функция-обработчик события удаления карточки
export const deleteCard = (card) => {
  card.remove();  
}

// Функция подсчета лайков карточки
export const countLikes = (container, imageData) => {
  container.textContent = imageData.likes.length;
};