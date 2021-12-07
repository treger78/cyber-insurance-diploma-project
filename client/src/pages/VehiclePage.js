import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const VehiclePage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError  } = useHttp();

  const [form, setForm] = useState({
    registerSign: '',
    VIN: '',
    vehicleCategory: '',
    marka: '',
    model: '',
    enginePower: '',
    releaseDate: '',
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

  let OSAGOPrice = 0;

  const calculateHandler = async () => {
    try {
      const baseValue = 5000; //базовый тариф страховки
      const enginePower = form.enginePower;
      let engineCoef = 0.6;

      if (form.registerSign === '' || form.VIN === '' || form.vehicleCategory === '' || form.marka === '' ||
        form.model === '' || form.enginePower === '' || form.releaseDate === '') {
        return message('Заполните все поля формы!');
      }

      //значения взяты с https://www.garant.ru/article/1409829/
      if (enginePower <= 50) {
        engineCoef = 0.6;
      } else if (enginePower <= 70) {
        engineCoef = 1;
      } else if (enginePower <= 100) {
        engineCoef = 1.1;
      } else if (enginePower <= 120) {
        engineCoef = 1.2;
      } else if (enginePower <= 150) {
        engineCoef = 1.4;
      } else if (enginePower > 150) {
        engineCoef = 1.6;
      } else {
        return message('Введено неверное значение мощности двигателя!');
      }

      OSAGOPrice = baseValue * engineCoef;

      message(`Cтоимость ОСАГО составит ${OSAGOPrice} руб.`);
    
      document.getElementsByClassName('row')[1].removeAttribute('hidden');
      document.getElementsByClassName('OSAGOPrice')[0].innerText = `Cтоимость ОСАГО составит ${OSAGOPrice} руб.`;
    } catch (e) {}
  }

  const checkoutHandler = async () => {
    try {
      await request('/api/vehicle', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      });

      message('Данные сохранены, заявка подана!');
    } catch (e) {}
  }

  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <h2 className="center-align">Рассчитать и оформить ОСАГО</h2>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <div>

                <div className="input-field">
                  <input
                    placeholder="Регистрационный знак (Гос. номер)"
                    id="registerSign"
                    type="text"
                    name="registerSign"
                    className="yellow-input"
                    value={ form.registerSign }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="registerSign">Регистрационный знак (Гос. номер)</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите VIN"
                    id="VIN"
                    type="text"
                    name="VIN"
                    className="yellow-input"
                    value={ form.VIN }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="VIN">VIN</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Категория ТС"
                    id="vehicleCategory"
                    type="text"
                    name="vehicleCategory"
                    className="yellow-input"
                    value={ form.vehicleCategory }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="vehicleCategory">Категория ТС</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите Марку"
                    id="marka"
                    type="text"
                    name="marka"
                    className="yellow-input"
                    value={ form.marka }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="marka">Марка</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите Модель"
                    id="model"
                    type="text"
                    name="model"
                    className="yellow-input"
                    value={ form.model }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="model">Модель</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите Мощность двигателя"
                    id="enginePower"
                    type="text"
                    name="enginePower"
                    className="yellow-input"
                    value={ form.enginePower }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="enginePower">Мощность двигателя</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите Датe выпуска ТС"
                    id="releaseDate"
                    type="text"
                    name="releaseDate"
                    className="yellow-input"
                    value={ form.releaseDate }
                    onChange={ changeHandler }
                  />
                  <label htmlFor="releaseDate">Дата выпуска ТС</label>
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
          <h2 className="center-align">Рассчитанная стоимость ОСАГО</h2>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <div>
                <div className="input-field">
                  <div className="OSAGOPrice"></div>
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
