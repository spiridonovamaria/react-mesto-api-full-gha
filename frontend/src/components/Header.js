import React from "react";
import vector from '../images/Vector.svg';
import { Link, Route, Routes } from "react-router-dom";


function Header({ userEmail, isLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Логотип" />
      <Routes>

        <Route path="/sign-in" element={<Link to="/sign-up" className="header__menu">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__menu">Войти</Link>} />
        <Route path="/react-mesto-auth" element={
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__menu" onClick={isLogout}>Выйти</Link>
          </div>} />
      </Routes>
    </header>
  );

}


export default Header;