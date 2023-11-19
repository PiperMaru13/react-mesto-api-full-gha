import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  function handleChangeInput(e) {
    e.target.name === "registerEmail"
      ? setUserEmail(e.target.value)
      : setUserPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(userEmail, userPassword);
  }
  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2 className="sign-form__title">Регистрация</h2>
      <input
        className="sign-form__input"
        value={userEmail}
        name="registerEmail"
        autoComplete="on"
        type="email"
        placeholder="Email"
        onChange={handleChangeInput}
        required
      />
      <input
        className="sign-form__input"
        value={userPassword}
        autoComplete="new-password" id="new-password"
        name="registerPassword"
        type="password"
        placeholder="Пароль"
        onChange={handleChangeInput}
        required
      />
      <button className="sign-form__submit" type="submit">
        Зарегистрироваться
      </button>
      <p className="sign-form__description">
        Уже зарегистрированы?{" "}
        <Link className="sign-form__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </form>
  );
}
