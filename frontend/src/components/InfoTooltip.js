import React from "react";
import iconDone from "../image/Union.svg";
import iconError from "../image/UnionError.svg";

export function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_display-open" : ""}`}>
      <div className={"popup__container"}>
        <button
          type="button"
          onClick={onClose}
          className="popup__close"
        ></button>
        <img
          className="popup__register-done"
          src={isSuccess ? iconDone : iconError}
          alt={isSuccess ? "Успешно" : "Ошибка"}
        ></img>
        <h3 className="popup__text popup__register-text">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}
