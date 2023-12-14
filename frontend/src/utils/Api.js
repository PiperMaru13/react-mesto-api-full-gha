class Api {
    constructor(data) {
        this._url = data.url;
    }

    _checkResponse(resp) {
        if (!resp.ok) {
            return Promise.reject(`Error: ${resp.status}`);
        }
        return resp.json();
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
        }).then((response) => this._checkResponse(response));
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
        }).then((response) => this._checkResponse(response));
    }

    editProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((response) => this._checkResponse(response));
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => this._checkResponse(response));
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((response) => this._checkResponse(response));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
        }).then((response) => this._checkResponse(response));
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
        }).then((response) => this._checkResponse(response));
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json",
            },
        }).then((response) => this._checkResponse(response));
    }
}

const api = new Api({
    url: "https://pipermaru.nomoredomainsmonster.ru",
});

export default api;
