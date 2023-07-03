import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard(props) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    setName("");
    setImage("");
  }, [props.isOpen]);

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddeImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link: image,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      textSafe="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-list">
        <input
          value={name || ""}
          onChange={handleAddName}
          id="names-link_card"
          required
          // minlength="2"
          // maxlength="40"
          type="text"
          name="name"
          className="popup__input-save popup__input-save_type_nameNew"
          placeholder="Название"
        />
        <span id="names-link-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-list">
        <input
          value={image || ""}
          onChange={handleAddeImage}
          id="abouts-link_card"
          required
          type="url"
          name="link"
          className="popup__input-save popup__input-save_type_aboutNew"
          placeholder="Сcылка на картинку"
        />
        <span id="abouts-link-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default PopupAddCard;
