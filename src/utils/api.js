class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  loadCards() {
    this._cards = fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
    return this._cards;
  }

  loadProfile() {
    this._profileInfo = fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
    return this._profileInfo;
  }

  getProfileId() {
    return (this.test = fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse));
  }

  _handleLike(string, obj) {
    this._like = fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: string,
      headers: this._headers,
    }).then(this._handleResponse);
    return this._like;
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable
      ? this._handleLike('PUT', obj)
      : this._handleLike('DELETE', obj);
    return this._status;
  }

  deleteLike(obj) {
    this._deleteLike = fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
    return this._deleteLike;
  }

  changeProfile(obj) {
    this._changedProfile = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    }).then(this._handleResponse);
    return this._changedProfile;
  }

  addCard({ title, link }) {
    this._addedCard = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._handleResponse);
    return this._addedCard;
  }

  deleteCard(obj) {
    this._deletedCard = fetch(`${this._url}/cards/${obj._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
    return this._deletedCard;
  }

  setNewAvatar(obj) {
    this._newAvatar = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    }).then(this._handleResponse);
    return this._newAvatar;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const server = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '12b2cd52-5967-45db-990f-351ecb43e60e',
    'Content-Type': 'application/json',
  },
});
