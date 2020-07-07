import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// import { Container } from './styles';

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
  
    useEffect(() => {
      const token = window.localStorage.getItem("token");
  
      if (token !== null) {
        history.push("/post");
      }
    }, [history]);
  
    const handleUpdateEmail = (e) => {
      setEmail(e.target.value)
    }
  
    const handleUpdatePassword = (e)  => {
      setPassword(e.target.value)
    }
  
    const login = async () => {
      const body = {
        email: email,
        password: password
      }
  
      try {
        const response = await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login
        `,body)
        window.localStorage.setItem("token", response.data.token);
        alert("Sucess")
        history.push("/post");
        
  
      } catch (error) {
        console.log(error);
        alert("Login error")
      }
    }
  
    return (
      <>
      <label htmlFor="login">Login</label>
      <input type="email" name="login" onChange={handleUpdateEmail}/>
      <label htmlFor="senha">Senha</label>
      <input type="pasword" name="senha" onChange={handleUpdatePassword} />
      <button onClick={login}>Login</button>
      <button>Registrar</button>
    </>
    )
  }

export default Login
