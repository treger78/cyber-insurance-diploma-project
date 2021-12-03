import React from "react";
import { NavLink } from "react-router-dom";
/*
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
*/

export const Navbar = () => {
  // const history = useHistory();
  // const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Cyber Insurance</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to="/vehicle">Транспортные средства</NavLink></li>
          <li><NavLink to="/trips">Путешествия</NavLink></li>
          <li><NavLink to="/estate">Имущество</NavLink></li>
          <li><NavLink to="/health">Здоровье</NavLink></li>
          <li><NavLink to="/personal">Личный кабинет</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
