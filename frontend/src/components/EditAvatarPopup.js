import PopupWithForm from "./PopupWithForm.js";
import React, { useEffect } from "react";

export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }

    function handleSubmitAvatar(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatarPopup"
            title="Обновить аватар"
            submitName={props.onLoading ? `Сохранение...` : `Сохранить`}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmitAvatar}
        >
            <input
                type="url"
                name="avatar"
                id="avatar"
                className="popup__input"
                placeholder="Ссылка на новый аватар"
                required
                ref={avatarRef}
                onChange={handleChangeAvatar}
            />
            <span className="popup__input-error popup__input-error_avatar" />
        </PopupWithForm>
    );
}
