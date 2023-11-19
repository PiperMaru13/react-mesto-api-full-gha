class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers;
    }

    _checkResponse(resp) {
        if (!resp.ok) {
            return Promise.reject(`Error: ${resp.status}`);
        }
        return resp.json();
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    editProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((response) => this._checkResponse(response));
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((response) => this._checkResponse(response));
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((response) => this._checkResponse(response));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }
}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-72",
    headers: {
        authorization: "c64f4044-70c0-475f-bac5-427bce388b08",
        "Content-Type": "application/json",
    },
});

export default api;
