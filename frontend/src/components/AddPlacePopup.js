import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);


    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({ name, link });
    }

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }
    return (<PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText="Создать">
        <input
            className="popup__input popup__input_type_title"
            type="text"
            placeholder="Название"
            name="name"
            required
            id="titleInput"
            onChange={handleChangeName}
            value={name} />
        <span
            className="popup__input-error titleInput-error"
            id="titleInput-error"></span>
        <input
            className="popup__input popup__input_type_link"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            id="linkInput" 
            onChange={handleChangeLink}
            value={link}/>
        <span
            className="popup__input-error linkInput-error"
            id="linkInput-error"></span>
    </PopupWithForm>)
}


export default AddPlacePopup;