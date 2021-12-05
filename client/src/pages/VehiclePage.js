import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const VehiclePage = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

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
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const calculateHandler = async () => {
    try {
        await request('/api/vehicle', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      });
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2 className="center-align">Калькулятора ОСАГО</h2>
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
  );
}
