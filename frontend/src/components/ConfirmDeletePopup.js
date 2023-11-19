import PopupWithForm from "./PopupWithForm.js";

export default function ConfirmDeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm
            name="confirmPopup"
            title="Вы уверены?"
            submitName={(props.onLoading) ? `Подождите...` : `Да`}
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        ></PopupWithForm>
    );
}
