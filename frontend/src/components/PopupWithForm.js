import React from "react";
function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose} />
                <form className="popup__content" name={props.name} onSubmit={props.onSubmit}>
                    <h2 className="popup__header"> {props.title} </h2>
                    <div className="popup__form-section">
                        {props.children}
                    </div>

                    <button className="popup__save" type="submit" title="Сохранить">{props.buttonText} </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;