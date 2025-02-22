//базовый адрес сервера, ключ авторизации, опции запроса
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: '2b3de0c8-0244-4191-b38a-9f0605d0630a',
    'Content-Type': 'application/json'
  }
}

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  };

  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse);
};

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse);
};

// Редактирование профиля
export const editProfile = (dataProfile) => {
  const body = JSON.stringify(dataProfile);

  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body,
  })
    .then(handleResponse);
};

// Добавление новой карточки
export const postNewCard = (data) => {
  const body = JSON.stringify(data);

  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body,
  })
    .then(handleResponse);
};

// Запрос на удаление карточки
export const deleteItem = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse);
};

// Постановка и снятие лайка
export const likeItem = (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
    .then(handleResponse);
};

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  const body = JSON.stringify({avatar});

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body,
  })
    .then(handleResponse);
};

