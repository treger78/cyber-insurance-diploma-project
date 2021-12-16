import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems);
  });

  return (
    <header>
      <nav>
        <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
          <span className="brand-logo"><NavLink to="/">CI</NavLink></span>
          <NavLink to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></NavLink>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/vehicle">Транспортные средства</NavLink></li>
            <li><NavLink to="/trips">Путешествия</NavLink></li>
            <li><NavLink to="/estate">Имущество</NavLink></li>
            <li><NavLink to="/health">Здоровье</NavLink></li>
            <li><NavLink to="/personal">Личный кабинет</NavLink></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to="/vehicle">Транспортные средства</NavLink></li>
          <li><NavLink to="/trips">Путешествия</NavLink></li>
          <li><NavLink to="/estate">Имущество</NavLink></li>
          <li><NavLink to="/health">Здоровье</NavLink></li>
          <li><NavLink to="/personal">Личный кабинет</NavLink></li>
      </ul>
    </header>
  );
}
