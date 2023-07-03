import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ handelRegisterCheck, handelRegisterFalse }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const { email, password } = formValue;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .registerPost(email, password)
      .then(() => {
        navigate("/Login");
        handelRegisterCheck();
      })
      .catch(() => handelRegisterFalse());
  };

  return (
    <div className="register">
      <h2 className="register__text">Регистрация</h2>
      <form className="register__form-input" onSubmit={handleSubmit}>
        <input
          className="register__input-email"
          onChange={handleChange}
          placeholder="Email"
          value={formValue.email}
          type="email"
          name="email"
          id="email"
        ></input>
        <input
          className="register__input-password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          type="password"
          name="password"
          autoComplete="on"
          id="password"
        ></input>
        <button className="register__button">Зарегистрироваться</button>
      </form>

      <div className="register__block-enter">
        <p className="register__block-text">
          Уже зарегистрированы?{" "}
          <Link className="register__link-login" to="/Login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
