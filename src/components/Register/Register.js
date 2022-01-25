import React , { useState , useEffect } from 'react';
import classes from './Register.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

const Register = (props) => {

    let registerModal = {
        'contact': '',
        'email': '',
        'name': '',
        'password': '',
        'role':'1'
    }
    let isEditActiveMode = false;
    if(props.editUserData && props.editUserData.name){
        registerModal.name = props.editUserData.name;
        registerModal.email = props.editUserData.email;
        registerModal.contact = props.editUserData.contact;
        registerModal.password = props.editUserData.password;
        isEditActiveMode = true;
    }
    const [enteredName, setEnteredName] = useState(registerModal.name);
    const [nameIsValid, setNameIsValid] = useState();
    const [enteredContact, setEnteredContact] = useState(registerModal.contact);
    const [contactIsValid, setContactIsValid] = useState();
    const [enteredEmail, setEnteredEmail] = useState(registerModal.email);
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState(registerModal.password);
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [isEditActive, setIsEditActive] = useState(isEditActiveMode);
    
  
    useEffect(()=> { 
      const identifier = setTimeout(()=> {
        setFormIsValid(
          enteredEmail.includes('@') && enteredPassword.trim().length > 6
        )
      },500);   
      return () => {
        clearTimeout(clearTimeout);
      }    
    },[enteredEmail,enteredPassword])
  
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);   
    };
    
    const contactChangeHandler = (event) => {
    setEnteredContact(event.target.value);
    };

    const emailChangeHandler = (event) => {
      setEnteredEmail(event.target.value);   
    };
  
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value);
    };

    const validateNameHandler = () => {
        setNameIsValid(enteredName.trim().length > 0);
    };

    const validateContactHandler = () => {
        setContactIsValid(enteredContact.trim().length > 0);
    };
  
    const validateEmailHandler = () => {
      setEmailIsValid(enteredEmail.includes('@'));
    };
  
    const validatePasswordHandler = () => {
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    // 1 => Normal User
    // 2 => Admin User
  
    const submitHandler = (event) => {
      event.preventDefault();
      let userList = localStorage.getItem('userList') || [];
      if(userList.length > 0){
       userList = JSON.parse(userList)
      }
      const obj = {
        name:enteredName,
        contact:enteredContact,
        email:enteredEmail,
        password:enteredPassword,
        role:1
      }
      if(isEditActive){
        userList.filter((user) => {
          if(user.email===props.editUserData.email)
          {
            user.name = enteredName;
            user.contact = enteredContact;
            user.email = enteredEmail;
            user.password = enteredPassword;
          }
        });
        localStorage.setItem('userList', JSON.stringify(userList));
        props.onRegisterAction(userList);
      } else {         
        userList.push(obj); 
        localStorage.setItem('userList', JSON.stringify(userList));
        console.log(userList);
        props.onRegisterAction(userList);
      }     
    };  



  return <Card className={classes.register}>
  <form onSubmit={submitHandler}>
    <div
    className={`${classes.control} ${
        nameIsValid === false ? classes.invalid : ''
    }`}
    >
    <label htmlFor="name">Name</label>
    <input
        type="text"
        id="name"
        value={enteredName}
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
    />
    </div>

    <div
    className={`${classes.control} ${
        contactIsValid === false ? classes.invalid : ''
    }`}
    >
    <label htmlFor="contact">Contact</label>
    <input
        type="text"
        id="contact"
        value={enteredContact}
        onChange={contactChangeHandler}
        onBlur={validateContactHandler}
    />
    </div>

    <div
      className={`${classes.control} ${
        emailIsValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor="email">E-Mail</label>
      <input
        type="email"
        id="email"
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
    </div>
    <div
      className={`${classes.control} ${
        passwordIsValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />
    </div>
    <div className={classes.actions}>
      <Button type="submit" className={classes.btn} disabled={!formIsValid}>
        { isEditActiveMode && 'Update'}
        { !isEditActiveMode && 'Register'}
      </Button>
    </div>
  </form>
</Card>;
}

export default Register;
