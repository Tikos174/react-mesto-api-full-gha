import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupAddCard from "./PopupAddCard";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
// import PopupDeleteCard from "./PopupDeleteCard";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute.js";
import { InfoTooltip } from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getinfoProfil()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  //Попап регистрации и логина
  const [isRegistenDone, setIsRegistenDone] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  function handelRegisterCheck() {
    setIsSuccess(true);
    setIsRegistenDone(true);
  }

  function handelRegisterFalse() {
    setIsSuccess(false);
    setIsRegistenDone(true);
  }

  function handelLoginCheck() {
    setIsRegistenDone(true);
    setIsSuccess(false);
  }

  //Попап добавление карточки
  const [isAddPopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPopupOpen);
  }

  //Попап профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  //   //Попап удаления
  // const [isEditDeletePopupCard, setIsEditDeletePopupCard] =
  //   React.useState(false);
  // function handleEditOpenDeleteCard() {
  //   setIsEditDeletePopupCard(!isEditDeletePopupCard);
  // }

  //Попап аватара
  const [isAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isAvatarPopupOpen);
  }

  //Попап картинки карточки
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  }

  //Закрытие Попап
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    // setIsEditDeletePopupCard(false);
    setIsRegistenDone(false);
  }

  function handleUpdateUser(data) {
    api
      .patchProfil(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .editProfilAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  const [loggenIn, setLoggenIn] = React.useState(false);
  const [emailData, setemailData] = React.useState('');

  function handleLogin(email) {
    setLoggenIn(true);
    setemailData(email)
  }

  function handleExit() {
    localStorage.removeItem("token");
    setLoggenIn(false);
    navigate("/login");
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    auth
      .checkToken(token)
      .then((user) => {
        handleLogin(user);
        setLoggenIn(user);
        navigate("/main");
        setemailData(user.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header emailData={emailData} handleExit={handleExit} />
          <Routes>
            <Route
              path="/register"
              element={
                <Register
                  handelRegisterCheck={handelRegisterCheck}
                  handelRegisterFalse={handelRegisterFalse}
                />
              }
            />

            <Route
              path="/login"
              element={
                <Login
                  handleLogin={handleLogin}
                  handelLoginCheck={handelLoginCheck}
                />
              }
            />
            <Route
              path="/"
              element={
                loggenIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onImage={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  loggenIn={loggenIn}
                />
              }
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={isRegistenDone}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
          <PopupAddCard
            isOpen={isAddPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          {/* <PopupDeleteCard
            isOpen={isEditDeletePopupCard}
            onEditDeleteCard={handleEditProfileClick}
            // onClose={closeAllPopups}
            onDeleteCard={handleEditOpenDeleteCard}
          /> */}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
