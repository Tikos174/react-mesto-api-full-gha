import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  
    return(
        <PopupWithForm      
        name="avatar"
        title="Обновить аватар"
        isOpen={props.isOpen}
        textSafe="Сохранить"
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            <div className="popup__input-list">
              <input
                ref={avatarRef}
                id="avatar-link"
                // required
                // minlength="2"
                // maxlength="40"
                type="url"
                name="avatar"
                className="popup__input-save popup__input-save_type_nameNew"
                placeholder="Сcылка на аватар"
              />
              <span id="avatar-link-error" className="popup__input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup