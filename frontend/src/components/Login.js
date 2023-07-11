import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ handleLogin, handelLoginCheck }) {
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

  const navigate = useNavigate();
  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .authorizationPost(email, password)
      .then((data) => {
        handleLogin(email);
        localStorage.setItem("token", data.token);
        navigate("/main");
      })
      .catch(() => {
        handelLoginCheck();
      });
  };

  return (
    <div className="register">
      <h2 className="register__text">Вход</h2>
      <form className="register__form-input" onSubmit={handleSubmit}>
        <input
          className="register__input-email"
          placeholder="Email"
          value={formValue.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          className="register__input-password"
          placeholder="Пароль"
          value={formValue.password}
          type="password"
          name="password"
          autoComplete="on"
          id="password"
          onChange={handleChange}
        ></input>
        <button className="register__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
