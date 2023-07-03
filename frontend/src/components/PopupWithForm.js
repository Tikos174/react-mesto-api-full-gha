import React from "react";

function PopupWithForm({
    name,
    isOpen,
    title,
    children,
    textSafe,
    onClose,
    onSubmit
}) {

  return (
    <div className={`popup ${isOpen ? "popup_display-open" : ''}`}>
        <div className={`popup__container popup__container-${name}`}>
          <button type="button" onClick={onClose} className="popup__close"></button>
          <h3 className="popup__text">{title}</h3>
          <form name={`form-${name}`} className="popup__input" onSubmit={onSubmit}> 
          {children}
            <button type="submit" className="popup__safe popup__button">
            {textSafe}
            </button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm
