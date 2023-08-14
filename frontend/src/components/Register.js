import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [formValue, setFormValue] = useState({
        password: '',
        email: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }
    function handleSubmit(e) {
        e.preventDefault();
        const { password, email } = formValue;
        onRegister(password, email);

    }

    return (
        <div className="register">
            <h2 className="register__header">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    className="register__input register__input_email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    id="emailInput"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    className="register__input register__input_password"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    required
                    id="passwordInput"
                    value={formValue.password}
                    onChange={handleChange}

                />

                <button className="register__submit-button" type="submit" >Зарегистрироваться</button>
            </form>
            <p className="register__login">Уже зарегистрированы?
                <Link className="register__link" to="/sign-in"> Войти</Link>
            </p>
        </div>
    )
}

export default Register;