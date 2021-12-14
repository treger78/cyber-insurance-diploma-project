import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const TripsPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError  } = useHttp();

  const [form, setForm] = useState({
    tripCountry: '',
    startDateOfTrip: '',
    numberOfDays: '',
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
      const dayCost = 300; //стоимость одного дня страхования

      if (form.tripCountry === '' || form.startDateOfTrip === '' || form.numberOfDays === '') {
        return message('Заполните все поля формы!');
      }

      // 1 day = 86400000 ms
      if (
        (new Date(form.startDateOfTrip).getTime() + 86400000) < new Date()
      ) {
        return message(`Дата начала поездки должна быть не раньше ${new Date().toLocaleDateString()}`);
      }

      insurancePolicePrice = dayCost * form.numberOfDays;

      message(`Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`);
    
      document.getElementsByClassName('row')[1].removeAttribute('hidden');
      document.getElementsByClassName('insurancePolicePrice')[0].innerText = `Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`;
    } catch (e) {}
  }

  const checkoutHandler = async () => {
    try {
        await request('/api/trip', 'POST', { ...form }, {
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
                    placeholder="Укажите страну поездки"
                    id="tripCountry"
                    type="text"
                    name="tripCountry"
                    className="yellow-input"
                    value={ form.tripCountry }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="tripCountry">Страна поездки</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Дата начала поездки"
                    id="startDateOfTrip"
                    type="date"
                    name="startDateOfTrip"
                    className="yellow-input"
                    value={ form.startDateOfTrip }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="startDateOfTrip">Дата начала поездки</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Длительность поездки (дней)"
                    id="numberOfDays"
                    type="text"
                    name="numberOfDays"
                    className="yellow-input"
                    value={ form.numberOfDays }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="numberOfDays">Длительность поездки (дней)</label>
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
