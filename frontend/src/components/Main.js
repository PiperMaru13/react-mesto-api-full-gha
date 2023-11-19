import React from "react";
import editPic from "../images/edit.svg";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img
                    className="profile__avatar"
                    src={currentUser.avatar}
                    alt="Аватар пользователя"
                />
                <button
                    className="profile__edit-avatar"
                    type="button"
                    onClick={props.onEditAvatar}
                >
                    <img
                        src={editPic}
                        alt="Редактировать"
                        className="profile__edit-ico"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements" aria-label="Фотокарточки">
                <template id="card-template" />
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        onConfirm={props.onConfirm}
                    />
                ))}
            </section>
        </main>
    );
}
