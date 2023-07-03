import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header({ emailData, handleExit }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/Register"
          element={
            <Link to="/Login" className="header__login register__link-login">
              Войти
            </Link>
          }
        />
        <Route
          path="/Login"
          element={
            <Link to="/Register" className="header__login register__link-login">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/Main"
          element={
            <div className="header__block-profil">
              <p className="header__login">{emailData}</p>
              <Link
                to="/Main"
                className="header__login register__link-login"
                onClick={handleExit}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
