import React, { useState } from 'react';

import { RedirectLogged } from '../../utils/Auth';
import { RegisterUser } from '../../utils/LoginAndCreateUser';
import useInputValue from '../../Hooks/useInputs';
// import { Container } from './styles';

function Register() {
  const [name, setName] = useInputValue('');
  const [email, setEmail] = useInputValue('');
  const [password, setPassword] = useInputValue('');

  RedirectLogged();
  const handleCreateUser = (e) => {
    e.preventDefault();
    RegisterUser(name, email, password);
  };

  return (
    <>
      <form action="name" onSubmit={handleCreateUser}>
        <label htmlFor="name">Nome do usuário</label>
        <input type="text" id="name" value={name} onChange={setName} required />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default Register;
