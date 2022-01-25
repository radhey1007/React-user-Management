import React, { useState , useEffect  } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Register from './components/Register/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActiveRegister,setIsActiveRegister] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [editUser , setEditUser] = useState();
 
  useEffect(()=> {
    const StoredUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if(StoredUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
    }
  }, []);  // Here depenedency is empty here that means it will run the useeffect function at the time of App initialization or when the value change

  const loginHandler = (loginType) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
    setLoginType(loginType);
  };

  const logoutHandler = () => {
    localStorage.setItem('isLoggedIn', '0');
    setIsLoggedIn(false);
  };

  const registerHandler = () => {
    setIsActiveRegister(true);
  }

  const registerAction = (data) => {
    setIsActiveRegister(false);
    console.log(data);
  }

  const editUserHandler = (user) => {
    console.log(user , 'TEST IN APP');
    setIsActiveRegister(true);
    setEditUser(user);
  }


  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}
      onRegister={registerHandler} />
      <main>
        {(!isLoggedIn && !isActiveRegister) && <Login onLogin={loginHandler} />}
        {(isLoggedIn && !isActiveRegister) && <Home onLogout={logoutHandler} 
        loginType={loginType}  onRegister={registerHandler} onEdit={editUserHandler}/>}
        {isActiveRegister && <Register onRegisterAction={registerAction} editUserData={editUser} />}
      </main>
    </React.Fragment>
  );
}

export default App;
