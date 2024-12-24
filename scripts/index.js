// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  /**  присваиваем значения элементов клонированного шаблона */
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  /** обработчик клика иконки удаления, по которому будет вызван переданный в аргументах колбэк */
  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
  const card = createCard(elem, deleteCard);

  cardsContainer.append(card);
});
