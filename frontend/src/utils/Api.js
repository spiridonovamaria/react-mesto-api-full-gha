class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка ${res.status}.`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => this._checkRequest(res));
  }


  getInfoUser() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => this._checkRequest(res));
  }


  editInfoUser({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then((res) => this._checkRequest(res));
  }
  editAvatarUser(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then((res) => this._checkRequest(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then((res) => this._checkRequest(res));
  }


  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then((res) => this._checkRequest(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => this._checkRequest(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => this._checkRequest(res));
  }

}
const api = new Api({
  /*url: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "f60634d5-63da-4429-b79c-be8f0298c760",
    "Content-Type": "application/json"
  }*/
  url: 'http://localhost:3000'
})

export default api;