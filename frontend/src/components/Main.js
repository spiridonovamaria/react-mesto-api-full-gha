import '../index.css';
import React from "react";
import image from '../images/image.jpg';
import api from "../utils/Api.js";
import Card from '../components/Card.js'
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    


    return (
        <main className="content">
            <section className="account">
                <div className="account__avatar" >
                    <img className="account__photo" src={currentUser.avatar} alt="Аватар" />
                    <button className="account__avatar-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="account__bio">
                    <div className="account__title">
                        <h1 className="account__name">{currentUser.name}</h1>
                        <button className="account__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <h3 className="account__profession">{currentUser.about}</h3>
                </div>
                <button className="account__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="posts">
                    <template id="cardTemplate" />
                    {props.cards.map(card => (<Card key={card._id} card={card} {...card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike}/>))}

                </ul>
            </section>
        </main>

    )
}

export default Main;