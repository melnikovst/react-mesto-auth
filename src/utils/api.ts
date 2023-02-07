interface headers {
  authorization: string;
  'Content-Type': string;
}

export type TCard = {
  title?: string;
  link?: string;
  _id?: string;
  likes?: { _id: string }[];
};

export type TProfile = {
  name?: string;
  about?: string;
  avatar?: string;
};

type Constructor = {
  url: string;
  headers: headers;
};

class Api {
  private _url: string;
  private _headers: { authorization: string; 'Content-Type': string };
  constructor({ url, headers }: Constructor) {
    this._url = url;
    this._headers = headers;
  }

  async loadCards() {
    const res = await fetch(`${this._url}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async loadProfile() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async getProfileId() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async _handleLike(string: string, obj: TCard) {
    const res = await fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: string,
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  changeLikeCardStatus(obj: TCard, variable: boolean) {
    return variable
      ? this._handleLike('PUT', obj)
      : this._handleLike('DELETE', obj);
  }

  async deleteLike(obj: TCard) {
    const res = await fetch(`${this._url}/cards/${obj._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async changeProfile(obj: TProfile) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    });
    return this._handleResponse(res);
  }

  async addCard({ title, link }: TCard) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    });
    return this._handleResponse(res);
  }

  async deleteCard(obj: TCard) {
    const res = await fetch(`${this._url}/cards/${obj._id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async setNewAvatar(obj: TProfile) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    });
    return this._handleResponse(res);
  }

  _handleResponse(res: Response) {
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
