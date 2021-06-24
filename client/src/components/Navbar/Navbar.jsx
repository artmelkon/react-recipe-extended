import React from 'react';
import { NavLink } from 'react-router-dom';

import { auth } from '../../FireBase/FireBase.utils';
import Logo from '../../assets/img/gp-color-logo.png';

const Navbar = ({ currentUser }) => (
  <nav className="header">
    <NavbarUnAuth />
  </nav>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink className="container__logo" to="/" exact>
        <img src={Logo} className="container__logo logo" alt="GP Color" />
      </NavLink>
    </li>
    <li>
      <<Navlink to="/seaerch">Seaerch</Navlink>
    </li>
    <li>
      <NavLink className="nav__link" to="/signin">
        Login
      </NavLink>
    </li>
    <li>
      <NavLink className="nav__link" to="/signup">
        Register
      </NavLink>
    </li>
  </ul>
);

export default Navbar;
