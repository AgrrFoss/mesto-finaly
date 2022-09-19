/*class Api {
    constructor (url, token) {
        this._url = url;
        this._token = token;
        this._headers = {
            authorization: this._token,
            'Content-Type': 'application/json'
        }
    }
*/
class Api {
    constructor (url) {
        this._url = url;
        this._headers = {
            'Content-Type': 'application/json'
        }
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo () {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    }

    postUserInfo(userObj) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(userObj)
        })
        .then(this._checkResponse)
        
    }
    postUserAvatar(userObj) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(userObj)
        })
        .then(this._checkResponse)
        
    }

    getCard () {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    }

    postCard( cardObj) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(cardObj)
        })
        .then(this._checkResponse)
    }
    /** отправляет запрос, касающийся лайка карточки
     * @param {*} cardId первый параметр: id карточки
     * @param {*} like второй параметр: функция определяющая поставлен ли лайк на карточке
     * @returns 
     */
    likeCard(cardId, like) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    }
    
}
// const api = new Api ('http://localhost:4000', '5df93b18-5437-4244-a6a2-8b097c8cb05f');
const api = new Api ('http://localhost:4000');

export default api;