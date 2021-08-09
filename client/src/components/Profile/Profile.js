import React, {Fragment} from 'react';

import UserInfo from './UserInfo';
import UserRecipes from "./UserRecipes";
import withAuth from '../Auth/withAuth';
import classes from './Profile.module.scss';

const Profile = ({session}) => (
  <div className={classes.profile}>
    <UserInfo session={session} />
    <UserRecipes creator={session.getCurrentUser._id} />
  </div>
)

export default withAuth(session => session && session.getCurrentUser)(Profile);
