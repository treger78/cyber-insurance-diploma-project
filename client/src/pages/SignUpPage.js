import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const SignUpPage = () => {
  // const auth = useContext(AuthContext);
  const message = useMessage();

  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    secondName: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    mobilePhone: '',
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

  const signUpHandler = async () => {
    try {
      const data = await request('/api/auth/signup', 'POST', { ...form });

      message(data.message);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2>Регистрация</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Данные пользователя</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите Фамилию"
                  id="secondName"
                  type="text"
                  name="secondName"
                  className="yellow-input"
                  value={ form.secondName }
                  onChange={ changeHandler }
                />
                <label htmlFor="secondName">Фамилия</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите Имя"
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="yellow-input"
                  value={ form.firstName }
                  onChange={ changeHandler }
                />
                <label htmlFor="firstName">Имя</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите Отчество (при наличии)"
                  id="patronymic"
                  type="text"
                  name="patronymic"
                  className="yellow-input"
                  value={ form.patronymic }
                  onChange={ changeHandler }
                />
                <label htmlFor="patronymic">Отчество</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите Дату рождения"
                  id="birthDate"
                  type="text"
                  name="birthDate"
                  className="yellow-input"
                  value={ form.birthDate }
                  onChange={ changeHandler }
                />
                <label htmlFor="birthDate">Дата рождения</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите Номер мобильного телефона"
                  id="mobilePhone"
                  type="text"
                  name="mobilePhone"
                  className="yellow-input"
                  value={ form.mobilePhone }
                  onChange={ changeHandler }
                />
                <label htmlFor="mobilePhone">Номер мобильного телефона</label>
              </div>

            </div>

            <span className="card-title">Данные для последующего входа</span>
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
              onClick={ signUpHandler }
              disabled={ loading }
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
