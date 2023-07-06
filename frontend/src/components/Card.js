import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like-active"
  }`;

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick(){
    props.onCardLike(props.card)
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
        alt={props.card.name}
        className="element__image"
        onClick={handleClick}
        src={props.card.link}
      />
      <div className="element__block-text">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__position-like">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
          <span className="element__counter-like">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
