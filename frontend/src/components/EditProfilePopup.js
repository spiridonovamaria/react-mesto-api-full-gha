import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }


    return (<PopupWithForm
        name="edit"
        title="Редактировать профиль"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        buttonText="Сохранить">
        <input
            className="popup__input popup__input_type_name "
            type="text" placeholder="Ваше имя"
            name="name"
            required
            id="nameInput"
            onChange={handleChangeName} 
            value={name || ''}  />
        <span
            className="popup__input-error nameInput-error"
            id="nameInput-error"></span>
        <input
            className="popup__input popup__input_type_job "
            type="text"
            placeholder="Род деятельности"
            name="about"
            required
            id="jobInput"
            onChange={handleChangeDescription}
            value={description || ''}   />
        <span className="popup__input-error nameInput-error" id="nameInput-error"></span>

    </PopupWithForm>)
}
export default EditProfilePopup;