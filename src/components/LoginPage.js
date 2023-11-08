import React, { useState } from "react";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Você pode adicionar lógica de autenticação aqui
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div>
      <h2 style={{ color: "aquamarine", marginBottom: "10px" }}>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "25px" }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "25px" }}
      />
      <button
        onClick={handleLogin}
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
    </div>
  );
};

export default LoginPage;
