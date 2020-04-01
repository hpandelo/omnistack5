import React, { useState } from 'react';
import twitterLogo from '../twitter.svg';
import './Login.css';
import Routes from '../Routes';

export default function Login({ history }) {
  const [ username, setUsername ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!username.length) console.log("No username found!");
    if (!username.length) return;

    console.log("Storing", username);
    localStorage.setItem('@GoTwitter:username', username);

    console.log("Redirecting to Timeline...");
    history.push(Routes.TIMELINE);
  }

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GoTwitter"></img>
      <form>
        <input 
          placeholder="Nome de Usuário"
          value={ username }
          onChange={ e => setUsername(e.target.value) }
        />
        <button 
          onClick={ handleSubmit }
          type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
