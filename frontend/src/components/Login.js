import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, email } = formValue;
        onLogin(password, email);

    }
    console.log(formValue.email);

    return (
        <div onSubmit={handleSubmit} className="login">
            <h2 className="login__header">Вход</h2>
            <form className="login__form" >
                <input
                    className="login__input login__input_email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    id="email"
                    onChange={handleChange}
                    value={formValue.email}
                />
                <input
                    className="login__input login__input_password"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    required
                    id="password"
                    onChange={handleChange}
                    value={formValue.password}
                />
                <button className="login__submit-button" type="submit" >Войти</button>
            </form>
            <p className="login__register">Ещё не зарегистрированы?
                <Link className="register__link" to="/sign-up"> Регистрация</Link>
            </p>
        </div>

    )
}


export default Login;