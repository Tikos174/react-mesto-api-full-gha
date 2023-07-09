import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardDelete, onCardClick, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((_id) => _id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like-active"
  }`;

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick(){
    onCardLike(card)
  }

  return (
    <li className="element__list">
      {isOwn && (
        <button
          type="button"
          className="element__delite"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        alt={card.name}
        className="element__image"
        onClick={handleClick}
        src={card.link}
      />
      <div className="element__block-text">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__position-like">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
          <span className="element__counter-like">{card.likes ? card.likes.length : 0}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;