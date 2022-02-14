import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const EstatePage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError  } = useHttp();

  const [form, setForm] = useState({
    objectAddress: '',
    objectArea: '',
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
      // https://www.alfastrah.ru/individuals/housing/municipal/
      const costSquareMeter = 31.20; //стоимость страхования за один метр квадратный

      if (form.objectAddress === '' || form.objectArea === '') {
        return message('Заполните все поля формы!');
      }

      // eslint-disable-next-line eqeqeq
      if (Number(form.objectArea) != form.objectArea) {
        return message('Введено неверное значение площади объекта!');
      }

      insurancePolicePrice = costSquareMeter * form.objectArea;

      message(`Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`);
    
      document.getElementsByClassName('row')[1].removeAttribute('hidden');
      document.getElementsByClassName('insurancePolicePrice')[0].innerText = `Cтоимость страхового полиса составит ${insurancePolicePrice} руб.`;
    } catch (e) {}
  }

  const checkoutHandler = async () => {
    try {
        await request('/api/estate', 'POST', { ...form }, {
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
                    placeholder="Укажите адрес объекта"
                    id="objectAddress"
                    type="text"
                    name="objectAddress"
                    className="yellow-input"
                    value={ form.objectAddress }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="objectAddress">Адрес объекта</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Площадь объекта, кв. м."
                    id="objectArea"
                    type="text"
                    name="objectArea"
                    className="yellow-input"
                    value={ form.objectArea }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="objectArea">Площадь объекта, кв. м.</label>
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
