import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="page-footer blue darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Cyber Insurance</h5>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Services</h5>
            <ul>
              <li><NavLink className="grey-text text-lighten-3" to="/">Главная</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/vehicle">Транспортные средства</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/trips" >Путешествия</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/estate">Имущество</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/health">Здоровье</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">© AO «Cyber Insurance».</div>
      </div>
    </footer>
  );
}
