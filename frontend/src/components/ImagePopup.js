import React from "react";
function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close popup__close-image" onClick={props.onClose}></button>
        <img className="popup__open-image" src={props.card.link} alt={props.card.name} />
        <p className="popup__header-image">{props.card.name}</p>
      </div>
    </div>
  );

}

export default ImagePopup;