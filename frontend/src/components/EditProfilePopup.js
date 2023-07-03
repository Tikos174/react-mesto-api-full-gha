import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

    return(
        <PopupWithForm      
        name="profil"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        textSafe="Сохранить"
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            <div className="popup__input-list">
              <input
                onChange={handleChangeName}
                value={name || ''}
                id="names-link"
                required
                minLength="2"
                maxLength="40"
                type="text"
                name="prof"
                className="popup__input-save popup__input-save_type_name"
                placeholder="Имя"
              />
              <span id="names-link-error" className="popup__input-error"></span>
            </div>
            <div className="popup__input-list">
              <input
                onChange={handleChangeDescription}
                value={description || ''}
                id="abouts-link"
                required
                minLength="2"
                maxLength="200"
                type="text"
                name="job"
                className="popup__input-save popup__input-save_type_about"
                placeholder="О себе"
              />
              <span id="abouts-link-error" className="popup__input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup