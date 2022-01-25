import React from 'react';

import Card from '../UI/Card/Card';
import UserList from '../UseList/UserList';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      {props.loginType==='Guest' && <h1>Welcome back!</h1> }
      {props.loginType==='Admin' && <UserList onAddUser={props.onRegister}
      onEditUser={props.onEdit} />}
    </Card>
  );
};

export default Home;
