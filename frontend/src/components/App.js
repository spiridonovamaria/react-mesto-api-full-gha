import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import api from "../utils/Api.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import ProtectedRoute from "./ProtectedRoute.js"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import ReactDOM from "react-dom"
import * as auth from "../utils/auth.js"
import InfoTooltip from "./InfoTooltip.js"
import Register from "./Register.js"
import Login from "./Login.js"
import yes from "../images/yes.svg"
import no from "../images/no.svg"
import React, { useState, useEffect } from "react"
import { register, authorize, getContent } from "../utils/auth"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [isLoggedIn, setLoggedIn] = React.useState(false)
  const [isUserEmail, setUserEmail] = useState("")

  const [isInfoTooltip, setInfoTooltip] = useState(false)
  const [isMessageInfoTooltip, setMessageInfoTooltip] = useState({
    img: "",
    header: "",
  })

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getInfoUser(), api.getInitialCards()])
        .then(([userRes, cards]) => {
          setCurrentUser(userRes)
          setCards(cards.data.reverse()) 
        })
        .catch((error) => console.log(error))
  }, [isLoggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id, true))
      .then((newCard) => {
        console.log(newCard)
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((error) => console.log(error))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((item) => item._id != card._id))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleUpdateUser(data) {
    api.editInfoUser(data).then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleUpdateAvatar(avatar) {
    console.log(avatar)
    api.editAvatarUser(avatar).then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
        setCards([newCard.data, ...cards])
        console.log(newCard)
        closeAllPopups()
      })
      .catch((error) => {
        console.error(error)
      })
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
    setInfoTooltip(false)
  }
  const navigate = useNavigate()

  const checkToken = (token) => {
    auth.getContent(token).then((res) => {
        setLoggedIn(true)
        setUserEmail(res.email)
        navigate("/react-mesto-auth")
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken(token)
    }
  }, [])

  const handleRegister = (password, email) => {
    auth.register(password, email).then(() => {
        setMessageInfoTooltip( { img: yes, header: 'Вы успешно зарегистрировались!' })
        navigate("/sign-in")
      })
      .catch(() =>
        setMessageInfoTooltip({ img: no, header: 'Что-то пошло не так! Попробуйте ещё раз.' })
      )
      .finally(() => setInfoTooltip(true))
  }

  const handleLogin = (password, email) => {
    auth.authorize(password, email).then((res) => {
        if (res) {
          localStorage.setItem("token", res.token)
          setUserEmail(email)
          setLoggedIn(true)

          navigate("/react-mesto-auth")
        }
      })
      .catch(() => {
        setInfoTooltip(true)
        console.log("Что-то пошло не так! Попробуйте ещё раз.")
        setMessageInfoTooltip({ img: no, header: "Что-то пошло не так! Попробуйте ещё раз."})
      })
  }

  function handleLogout() {
    setLoggedIn(false)
    localStorage.removeItem("token")
    navigate("/sign-in")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            userEmail={isUserEmail}
            isLoggedIn={isLoggedIn}
            isLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/react-mesto-auth"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />

            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/react-mesto-auth" />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            img={isMessageInfoTooltip.img}
            header={isMessageInfoTooltip.header}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
