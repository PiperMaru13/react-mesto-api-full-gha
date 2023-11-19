import React from "react";

export default function Login({onLogin}) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  function handleChangeInput(e) {
    e.target.name === "loginEmail"
      ? setUserEmail(e.target.value)
      : setUserPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userEmail, userPassword)
  }

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2 className="sign-form__title">Вход</h2>
      <input
        className="sign-form__input"
        value={userEmail}
        autoComplete="on"
        type="email"
        placeholder="Email"
        name="loginEmail"
        onChange={handleChangeInput}
        required
      />
      <input
        className="sign-form__input"
        value={userPassword}
        type="password"
        placeholder="Пароль"
        autoComplete="current-password" id="current-password"
        name="loginPassword"
        onChange={handleChangeInput}
        required
      />
      <button className="sign-form__submit" type="submit">
        Войти
      </button>
    </form>
  );
}
