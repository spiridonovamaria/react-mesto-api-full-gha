/*const BASE_URL = "https://api.spiridon.nomoreparties.co"*/
const BASE_URL = "http://localhost:3000"

const checkRequest = (res) => {
if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then((res) => checkRequest(res));
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            email: email
        }),
    })
        .then((res) => checkRequest(res));
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    })
        .then((res) => checkRequest(res));
};

