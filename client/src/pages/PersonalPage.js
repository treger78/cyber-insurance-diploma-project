import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Loader } from '../components/Loader';


export const PersonalPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const message = useMessage();

  const [ user, setUser ] = useState([]);
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

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
        <tbody>
          <tr>
            <td>{ user.polices }</td>
          </tr>
        </tbody>
      </table>

      <div className="actionButtons">
        <button className="blue darken-1"><NavLink to="/personal-change" style={{ color: "white" }}>Изменить персональные данные</NavLink></button>
        <button className="blue darken-1"><a href="/" onClick={ logoutHandler } style={{ color: "white" }}>Выйти</a></button>
      </div>

    </div>
  );
}
