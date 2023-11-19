import React from "react";

export default function PopupWithForm(props) {
    return (
        <section
            name={`${props.name}`}
            className={`popup ${props.isOpen ? "popup_opened" : ""}`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={props.onClose}
                />
                <form
                    noValidate
                    name={`${props.name}Form`}
                    className="popup__form"
                    onSubmit={props.onSubmit}
                >
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__submit-button">
                        {props.submitName}
                    </button>
                </form>
            </div>
        </section>
    );
}
