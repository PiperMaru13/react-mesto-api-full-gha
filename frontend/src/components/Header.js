import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onLogout , currentEmail}) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
      {location.pathname === "/" && (
        <nav className="header__navigation">
          <p className="header__email">{currentEmail}</p>{" "}
          <button className="header__button-logout" onClick={onLogout}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}
