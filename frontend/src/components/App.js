import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as Auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSucceed, setSucceed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isDeletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentEmail = localStorage.getItem("email");
    currentEmail ? setUserEmail(currentEmail) : setUserEmail("");
    if (isLoggedIn) {
      Promise.all([api.getProfileInfo(), api.getCards()]).then(([getProfileInfo, cardData]) => {
        setCurrentUser(getProfileInfo);
        setCards(cardData);
      }).catch(err => console.log(err));
    }
}, [isLoggedIn]);

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((res) => {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoPopupOpen(true);
        setSucceed(false);
      });
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        setSucceed(true);
        setInfoPopupOpen(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setSucceed(false);
        setInfoPopupOpen(true);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/sign-in", { replace: true });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    (isLiked ? api.removeLike(card._id) : api.putLike(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    setLoading(true);
    api
      .editProfileInfo(userInfo)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(userInfo) {
    setLoading(true);
    api
      .changeAvatar(userInfo)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(newCardData) {
    setLoading(true);
    api
      .addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfileOpen(false);
    setConfirmPopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} currentEmail={userEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardDelete={setDeletedCard}
                onConfirm={setConfirmPopupOpen}
                cards={cards}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSucceed}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <ImagePopup
          name="imagePopup"
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onLoading={isLoading}
          card={isDeletedCard}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
