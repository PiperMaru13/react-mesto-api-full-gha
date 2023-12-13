import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
// import api from "../utils/Api.js";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
    const isLiked = props.card.likes.some((i) => i === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

    const cardLikeButtonClassName = `card__like-button ${
        isLiked && "card__like-button_active"
    }`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
        props.onConfirm(true);
    }

    function handleCardLike() {
        props.onCardLike(props.card, isLiked);
    }

    return (
        <article className="card" key={props.card._id}>
            <img
                className="card__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            {isOwn && (
                <button
                    onClick={handleCardDelete}
                    type="button"
                    className="card__delete-button"
                />
            )}
            <div className="card__description">
                <h2 className="card__title" aria-label="Название карточки">
                    {props.card.name}
                </h2>
                <div className="card__like">
                    <button
                        onClick={handleCardLike}
                        type="button"
                        className={cardLikeButtonClassName}
                    />
                    <p className="card__like-counter">
                        {props.card.likes.length}
                    </p>
                </div>
            </div>
        </article>
    );
}
