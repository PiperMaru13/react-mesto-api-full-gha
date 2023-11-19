import React from "react";
import successLogo from "../images/success.svg";
import errorLogo from "../images/error.svg";

export default function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="popup__image popup__image_clear" alt="Картинка статуса" src={(props.isSuccess) ? successLogo : errorLogo}/>
        <h2 className="popup__title popup__title_tight">{(props.isSuccess) ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
      </div>
    </section>
  );
}
