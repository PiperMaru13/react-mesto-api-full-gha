export const BASE_URL = "https://pipermaru.nomoredomainsmonster.ru";

export function checkResponse(resp) {
  if (!resp.ok) {
    return Promise.reject(`Error: ${resp.status}`);
  }
  return resp.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse)
  .then((data) => {
    if (data.token) {
    localStorage.setItem("jwt", data.token)
    return data;
    }
  });
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};
