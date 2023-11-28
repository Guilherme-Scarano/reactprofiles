import React, { useState } from "react";
import LoginPage from "./LoginPage";
import logoImage from "../img/iflogobranco.png";

const Header = ({  isLoggedIn, setIsLoggedIn, openAddStudentForm, setIsAddingStudent }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setShowLoginForm(false);
    setIsLoggedIn(false);
    setIsAddingStudent(false); // Adicione esta linha para fechar o formulário de adição
    sessionStorage.setItem("isLoggedIn", "false");
  };

  return (
    <div
      style={{
        backgroundColor: "#333",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "flex",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoImage}
          alt="IF Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span style={{ color: "#fff", fontSize: "18px" }}>Instituto Federal - Campus Machado</span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {!isLoggedIn && !showLoginForm && (
          <button
            onClick={handleLoginButtonClick}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "4px"
            }}
          >
            Login
          </button>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Sair
            </button>

            <button
              onClick={openAddStudentForm}
              style={{
                background: "blue",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Adicionar Egresso
            </button>
          </>
        )}
      </div>

      {showLoginForm && !isLoggedIn && (
        <LoginPage setIsLoggedIn={setIsLoggedIn} onClose={handleLoginFormClose} />
      )}
    </div>
  );
};

export default Header;