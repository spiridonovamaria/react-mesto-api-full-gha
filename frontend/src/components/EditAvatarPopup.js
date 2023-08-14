import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const ref = React.useRef();
    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar(ref.current.value);
    }

    React.useEffect(() => {
        ref.current.value = "";
    }, [isOpen]);

    return (<PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        buttonText="Сохранить">
        <input
            ref={ref}
            className="popup__input popup__input_type_avatar"
            type="url"
            placeholder="Ссылка на картинку"
            name="avatar"
            required
            id="avatarInput" />
        <span
            className="popup__input-error avatarInput-error"
            id="avatarInput-error"></span>
    </PopupWithForm>)





}

export default EditAvatarPopup;