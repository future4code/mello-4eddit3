import React from 'react';
import api from '../services/api';

export const RegisterUser = async (email, password, username) => {
  const body = {
    email: email,
    password: password,
    username: username,
  };

  try {
    console.log(body);
    await api.post('/signup', body);
    return console.log('feito, tio!');
  } catch ({ response }) {
    console.log(response.data.message);
    console.log('é deu ruim irmão!');
  }
};
