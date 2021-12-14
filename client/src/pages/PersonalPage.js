import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { InsurancePoliceCard } from '../components/InsurancePoliceCard';

export const PersonalPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [ user, setUser ] = useState([]);
  const [ vehiclePolice, setVehiclePolice ] = useState([]);
  const [ tripPolice, setTripPolice ] = useState([]);
  const [ estatePolice, setEstatePolice ] = useState([]);
  const [ healthPolice, setHealthPolice ] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const logoutHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  const fetchData = useCallback(async () => {
    try {
      const fetchedUser = await request('/api/personal', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedVehiclePolice = await request('/api/personal/vehiclePolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedTripPolice = await request('/api/personal/tripPolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedEstatePolice = await request('/api/personal/estatePolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedHealthPolice = await request('/api/personal/healthPolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      
      setUser(fetchedUser);
      setVehiclePolice(fetchedVehiclePolice);
      setTripPolice(fetchedTripPolice);
      setEstatePolice(fetchedEstatePolice);
      setHealthPolice(fetchedHealthPolice);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <h2 className="center-align">Личный кабинет</h2>

      { !loading }

      <h3 className="center-align">Персональные данные</h3>

      <table className="responsive-table">
        <tbody>
          <tr>
            <td>Фамилия</td>
            <td>{ user.secondName }</td>
          </tr>
          <tr>
            <td>Имя</td>
            <td>{ user.firstName }</td>
          </tr>
          <tr>
            <td>Отчество</td>
            <td>{ user.patronymic || 'отсутствует' }</td>
          </tr>
          <tr>
            <td>Дата рождения</td>
            <td>{ new Date(user.birthDate).toLocaleDateString() }</td>
          </tr>
          <tr>
            <td>Мобильный телефон</td>
            <td>{ user.mobilePhone }</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>{ user.email }</td>
          </tr>
        </tbody>
      </table>

      <h3 className="center-align">Ваши страховые полисы</h3>

      {
        !vehiclePolice.length && !tripPolice.length &&
        !estatePolice.length && !healthPolice.length &&
        <h5 className="center-align">Похоже, что у вас нет оформленных страховых полисов!</h5>
      }

      {
        vehiclePolice.length !== 0 &&
        <>
          <h5 className="center-align">Страховые полисы "Транспортные средства":</h5>
          <InsurancePoliceCard insurancePolice={ vehiclePolice } />
        </>
      }

      {
        tripPolice.length !== 0 &&
        <>
          <h5 className="center-align">Страховые полисы "Путешествия":</h5>
          <InsurancePoliceCard insurancePolice={ tripPolice } />
        </>
      }

      {
        estatePolice.length !== 0 &&
        <>
          <h5 className="center-align">Страховые полисы "Имущество":</h5>
          <InsurancePoliceCard insurancePolice={ estatePolice } />
        </>
      }

      {
        healthPolice.length !== 0 &&
        <>
          <h5 className="center-align">Страховые полисы "Здоровье":</h5>
          <InsurancePoliceCard insurancePolice={ healthPolice } />
        </>
      }

      <div className="actionButtons">
        <button className="blue darken-1"><NavLink to="/personal-change" style={{ color: "white" }}>Изменить персональные данные</NavLink></button>
        <button className="blue darken-1"><a href="/" onClick={ logoutHandler } style={{ color: "white" }}>Выйти</a></button>
      </div>

    </div>
  );
}
