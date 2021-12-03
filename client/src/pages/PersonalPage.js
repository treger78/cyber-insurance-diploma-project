import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PersonalPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <div>
      <h1>PersonalPage</h1>
      <button><NavLink to="/personal-change">Изменить данные</NavLink></button>
      <button><a href="/" onClick={ logoutHandler }>Выйти</a></button>
    </div>
  );
}
