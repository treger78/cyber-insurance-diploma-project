import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const HealthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError  } = useHttp();

  const [form, setForm] = useState({
    insuranceCity: '',
    age: '',
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

  let insurancePolicePrice = 0;

  const calculateHandler = async () => {
    try {
      // https://davaisravnim.ru/articles/dms/additional/pol-vozrast/
      const basePrice = 40000;

      if (form.insuranceCity === '' || form.age === '') {
        return message('Заполните все поля формы!');
      }

      let coef = 1;

      if (form.age < 22) {
        coef = 1;
      } else if (form.age >= 22 && form.age < 30) {
        coef = 1.2;
      } else if (form.age >= 30 && form.age < 45) {
        coef = 1.3;
      } else if (form.age >= 45 && form.age < 60) {
        coef = 1.4;
      } else if (form.age >= 60 && form.age < 64) {
        coef = 1.5;
      } else if (form.age >= 64 && form.age < 70) {
        coef = 1.7;
      } else  if (form.age >= 70) {
        coef = 2;
      } else {
        return message('Введен неверный возраст!');
      }

      insurancePolicePrice = basePrice * coef;

      message(`Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`);
    
      document.getElementsByClassName('row')[1].removeAttribute('hidden');
      document.getElementsByClassName('insurancePolicePrice')[0].innerText = `Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`;
    } catch (e) {}
  }

  const checkoutHandler = async () => {
    try {
        await request('/api/health', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      });

      message('Данные сохранены, заявка подана!');
    } catch (e) {}
  }

  return (
    <div>
      <div className="row">
        <div className="container">
          <h3 className="center-align">Рассчитать и оформить страховой полис</h3>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <div>

                <div className="input-field">
                  <input
                    placeholder="Укажите город страхования"
                    id="insuranceCity"
                    type="text"
                    name="insuranceCity"
                    className="yellow-input"
                    value={ form.insuranceCity }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="insuranceCity">Город страхования</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Возраст (полных лет)"
                    id="age"
                    type="text"
                    name="age"
                    className="yellow-input"
                    value={ form.age }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="age">Возраст (полных лет)</label>
                </div>

              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                onClick={ calculateHandler }
                disabled={ loading }
              >
                Рассчитать
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" hidden={true}>
        <div className="col s6 offset-s3">
          <h2 className="center-align">Рассчитанная стоимость страхового полиса</h2>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <div>
                <div className="input-field">
                  <div className="insurancePolicePrice"></div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                onClick={ checkoutHandler }
                disabled={ loading }
              >
                Оформить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
