export const register = async (email, password) => {
  const res = await fetch('https://auth.nomoreparties.co/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const response = await res.json();
  if (res.ok) {
    return response;
  }
  return Promise.reject(response);
};

export const login = async (email, password) => {
  const res = await fetch('https://auth.nomoreparties.co/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const response = await res.json();
  if (res.ok) {
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return;
  }
  return Promise.reject(response);
};

export const goMain = async (jwt) => {
  const res = await fetch('https://auth.nomoreparties.co/users/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(await res.json());
};
