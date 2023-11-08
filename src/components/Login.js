import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para fazer a autenticação com o servidor
    // Normalmente, você faria uma solicitação para o servidor com o nome de usuário e senha
    // e, se as credenciais estiverem corretas, retornaria um token de autenticação.

    // Para fins de demonstração, aqui estamos apenas verificando se os campos estão preenchidos.
    if (username && password) {
      onLogin(); // Chame a função de login após uma autenticação bem-sucedida
    } else {
      alert("Preencha o nome de usuário e a senha.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
