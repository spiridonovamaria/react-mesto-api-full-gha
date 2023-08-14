import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `post__like-button ${isLiked && 'post__like-button_active'}` 
  );; 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <li className="post">
      <img className="post__photo" onClick={handleClick} src={`${props.card.link}`} alt={`${props.card.name}`} />
      <div className="post__info">
        <h3 className="post__name">{`${props.card.name}`}</h3>
        <div className="post__container-like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} ></button>
          <span className="post__like-score">{props.card.likes.length}</span>
        </div>
        {isOwn && <button className="post__delete-button" onClick={handleDeleteClick} type="button"></button> }
      </div>
    </li>
  )
}

export default Card;