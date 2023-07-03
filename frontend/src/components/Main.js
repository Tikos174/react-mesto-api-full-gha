import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__blocks">
          <div className="profile__avatar">
            <img 
              className="profile__img"
              src={currentUser.avatar}
              onClick={props.onEditAvatar}
              alt="Логотип"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-block">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__button openPopUp"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__button-add openPopUp"
        ></button>
      </section>
      <section className="elements">
        <ul className="element">
          {props.cards.map((card) => (
            <Card 
            card={card} 
            key={card._id} 
            onCardClick={props.onImage}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}

             />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
