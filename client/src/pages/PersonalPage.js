import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';

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

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request('/api/personal', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setUser(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchVehiclePolices = useCallback(async () => {
    try {
      const fetched = await request('/api/personal/vehiclePolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setVehiclePolice(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchTripPolices = useCallback(async () => {
    try {
      const fetched = await request('/api/personal/tripPolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setTripPolice(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchEstatePolices = useCallback(async () => {
    try {
      const fetched = await request('/api/personal/estatePolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setEstatePolice(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchHealthPolices = useCallback(async () => {
    try {
      const fetched = await request('/api/personal/healthPolice', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setHealthPolice(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchUser();
    fetchVehiclePolices();
    fetchTripPolices();
    fetchEstatePolices();
    fetchHealthPolices();
  }, 
  [
    fetchUser, 
    fetchVehiclePolices, 
    fetchTripPolices, 
    fetchEstatePolices, 
    fetchHealthPolices
  ]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <h1 className="center-align">Личный кабинет</h1>

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
        </tbody>
      </table>

      <h3 className="center-align">Ваши страховые полисы</h3>

      <table className="responsive-table">
        <thead className="center-align">Страховые полисы "Транспортные средства":</thead>
        <tbody>
          <tr className="personalPoliceThead">
            <td>№ п/п</td>
            <td>Номер полиса</td>
            <td>Дата заключения</td>
            <td>Дата окончания</td>
          </tr>
          {
            vehiclePolice.map((police, index) => {
              return (
                <tr key={ police._id }>
                  <td>{ index + 1 }</td>
                  <td>{ police.policeID }</td>
                  <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
                  <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
                </tr>
              );
            })
          }
        </tbody>

        <thead className="center-align">Страховые полисы "Путешествия":</thead>
        <tbody>
          <tr className="personalPoliceThead">
            <td>№ п/п</td>
            <td>Номер полиса</td>
            <td>Дата заключения</td>
            <td>Дата окончания</td>
          </tr>
          {
            tripPolice.map((police, index) => {
              return (
                <tr key={ police._id }>
                  <td>{ index + 1 }</td>
                  <td>{ police.policeID }</td>
                  <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
                  <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
                </tr>
              );
            })
          }
        </tbody>

        <thead className="center-align">Страховые полисы "Имущество":</thead>
        <tbody>
          <tr className="personalPoliceThead">
            <td>№ п/п</td>
            <td>Номер полиса</td>
            <td>Дата заключения</td>
            <td>Дата окончания</td>
          </tr>
          {
            estatePolice.map((police, index) => {
              return (
                <tr key={ police._id }>
                  <td>{ index + 1 }</td>
                  <td>{ police.policeID }</td>
                  <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
                  <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
                </tr>
              );
            })
          }
        </tbody>

        <thead className="center-align">Страховые полисы "Здоровье":</thead>
        <tbody>
          <tr className="personalPoliceThead">
            <td>№ п/п</td>
            <td>Номер полиса</td>
            <td>Дата заключения</td>
            <td>Дата окончания</td>
          </tr>
          {
            healthPolice.map((police, index) => {
              return (
                <tr key={ police._id }>
                  <td>{ index + 1 }</td>
                  <td>{ police.policeID }</td>
                  <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
                  <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="actionButtons">
        <button className="blue darken-1"><NavLink to="/personal-change" style={{ color: "white" }}>Изменить персональные данные</NavLink></button>
        <button className="blue darken-1"><a href="/" onClick={ logoutHandler } style={{ color: "white" }}>Выйти</a></button>
      </div>

    </div>
  );
}
