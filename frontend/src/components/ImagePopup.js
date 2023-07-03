import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_image-window ${
        props.isOpen ? "popup_display-open" : ""
      }`}
    >
      <div className="popup__profil">
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close popup__closeImg"
        ></button>
        <figure>
          <img
            alt={props.card.name}
            className="popup__image"
            src={props.card.link}
          />
          <figcaption className="popup__text-profil">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
