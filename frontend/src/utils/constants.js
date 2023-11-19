export const data = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error",
};
export const selectorPopupImage = '[name="imagePopup"]';
export const selectorPopupCard = '[name="cardPopup"]';
export const selectorAvatarPopup = '[name="avatarPopup"]';
export const selectorPopupProfile = '[name="profilePopup"]';
export const selectorCardsContainer = ".elements";
export const selectorTemplateCard = "#card-template";
export const selectorTitleProfile = ".profile__title";
export const selectorDescriptionProfile = ".profile__description";
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupProfile = document.querySelector(selectorPopupProfile);
export const buttonEditProfile = document.querySelector(
    ".profile__edit-button"
);
export const formEditProfile = document.forms["editProfileForm"];
export const userName = document.querySelector(".profile__title"); //Имя профиля страницы
export const userDescription = document.querySelector(".profile__description"); //Описание профиля страницы
export const cardImage = document.querySelectorAll(".card__image");
export const popupAddCard = document.querySelector(selectorPopupCard);
export const buttonCardPopup = document.querySelector(".profile__add-button");
export const formAddCard = document.forms["addCardForm"];
export const formAvatar = document.forms["avatarPopupForm"];
export const popupImage = document.querySelector(selectorPopupImage);
export const cardsContainer = document.querySelector(selectorCardsContainer);
export const buttonAvatar = document.querySelector(".profile__edit-avatar");
