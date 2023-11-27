import React, { useState } from "react";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Você pode adicionar lógica de autenticação aqui
    if (username === "admin" && password === "admin") {
      const isAuthenticated = true; // Substitua por sua lógica de autenticação real

      if (isAuthenticated) {
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
        // Não há necessidade de redirecionar, pois já está na mesma página
      } else {
        alert("Credenciais inválidas. Tente novamente.");
      }
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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