import React from "react";

export default function ImagePopup(props) {
  return (
    <section
      name={`${props.name}`}
      className={`popup popup_wide ${props.card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_wide">
        <h2 className="popup__title popup__title_white">{props.card.name}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
      </div>
    </section>
  );
}
