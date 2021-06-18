import React from 'react';
import { NavLink } from 'react-router-dom';

import { auth } from '../../FireBase/FireBase.utils';
import Logo from '../../assets/img/gp-color-logo.png';

const Header = ({ currentUser }) => (
  <div className="header">
    <NavLink className="container__logo" to="/">
      <img src={Logo} className="container__logo logo" alt="GP Color" />
    </NavLink>
    <div className="nav">
      {currentUser ? (
        <button className="nav__link" onClick={() => auth.signOut()}>Log Out</button>
      ) : (
        <div>
          <NavLink className="nav__link" to="/signin">
            Login
          </NavLink>
          <NavLink className="nav__link" to="/signup">
            Register
          </NavLink>
        </div>
      )}
    </div>
  </div>
);

export default Header;