import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {
  return (
    <PopupWithForm
        name="delete"
        title="Вы уверены?"
        isOpen={props.isOpen}
        textSafe="Да"
        onClose={props.onClose}
        onSubmit={props.handleSubmit}>   
    </PopupWithForm>
  );
}

export default PopupDeleteCard;
