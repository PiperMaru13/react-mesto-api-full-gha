import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeInput(e) {
        e.target.name === "username"
            ? setName(e.target.value)
            : setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="editProfile"
            title="Редактировать профиль"
            submitName={props.onLoading ? `Сохранение...` : `Сохранить`}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                minLength={2}
                maxLength={40}
                type="text"
                name="username"
                className="popup__input"
                id="name"
                placeholder="Имя"
                value={name}
                required
                onChange={handleChangeInput}
            />
            <span className="popup__input-error popup__input-error_username" />
            <input
                minLength={2}
                maxLength={200}
                type="text"
                name="user-description"
                className="popup__input"
                placeholder="О себе"
                id="description"
                value={description}
                required
                onChange={handleChangeInput}
            />
            <span className="popup__input-error popup__input-error_user-description" />
        </PopupWithForm>
    );
}
