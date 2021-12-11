import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NavLink } from "react-router-dom";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();

  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const signInHandler = async () => {
    try {
      const data = await request('/api/auth/signin', 'POST', { ...form });

      auth.login(data.token, data.userId);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="container">
        <h2 className="center-align">Авторизация</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите Email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={ form.email }
                  onChange={ changeHandler }
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={ form.password }
                  onChange={ changeHandler }
                />
                <label htmlFor="password">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={ signInHandler }
              disabled={ loading }
            >
              Войти
            </button>
          </div>
        </div>
        <div>
          <div>Новый пользователь?</div>
          <div><NavLink to="/signup">Зарегистрироваться</NavLink></div>
			  </div>
      </div>
    </div>
  );
}
