import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../FireBase/FireBase.utils';
import Logo from '../../assets/img/gp-color-logo.png';

const Header = ({ currentGoogleUser }) => (
  <div className="header">
    <Link className="container__logo" to="/">
      <img src={Logo} className="container__logo logo" alt="GP Color" />
    </Link>
    <div className="nav">
      {currentGoogleUser ? (
        <div className="nav__link" onClick={() => auth.signOut()}>Log Out</div>
      ) : (
        <Link className="nav__link" to="/signin">
          Login
        </Link>
      )}
      <Link className="nav__link" to="/signup">
        Register
      </Link>
    </div>
  </div>
);

export default Header;