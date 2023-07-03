const URL = "https://api.mesto.yandex.students.nomoreparties.sbs";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function registerPost(email, password) {
  return fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function authorizationPost(email, password) {
  return fetch(`${URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function checkToken(token) {
  return fetch(`${URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}
