import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState("");
    const [placeLink, setPlaceLink] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    function handleChangeInput(e) {
        e.target.name === "card-name"
            ? setPlaceName(e.target.value)
            : setPlaceLink(e.target.value);
    }

    return (
        <PopupWithForm
            name="cardPopup"
            title="Новая карточка"
            submitName={props.onLoading ? `Отправка...` : `Отправить`}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                minLength={2}
                maxLength={30}
                type="text"
                name="card-name"
                id="title"
                className="popup__input"
                placeholder="Название"
                onChange={handleChangeInput}
                required
            />
            <span className="popup__input-error popup__input-error_card-name" />
            <input
                type="url"
                name="card-link"
                id="url"
                className="popup__input"
                placeholder="Ссылка на картинку"
                onChange={handleChangeInput}
                required
            />
            <span className="popup__input-error popup__input-error_card-link" />
        </PopupWithForm>
    );
}
