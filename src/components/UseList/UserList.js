import React , { useState , useEffect} from 'react';
import Button from '../UI/Button/Button';
import styles from './UserList.module.css';

const UserList = (props) => {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList();
  },[]);

  const getUserList = () => {
    let data = localStorage.getItem('userList') || [];
    if(data.length > 0) {
      data = JSON.parse(data); 
      setUserList((olduserList) => {
        return olduserList.concat(data);
      });
    }    
  }
  
  const deleteHandler = (email) => {
    if(email){
      let userList = JSON.parse(localStorage.getItem('userList'));
      userList = userList.filter(user => user.email !==email);
      localStorage.setItem('userList', JSON.stringify(userList));
      setUserList((olduserList) => {
        return userList;
     });
    }
  }

  const handleAddUser = () => {
    props.onAddUser();
  }

  const handleEditUser = (user) => {
    props.onEditUser(user);
  }

  return (
          <div className={styles['product-list']}>
            <div className={styles.add}>
               <Button onClick={handleAddUser}> Add user </Button>
            </div>
                         { userList.length > 0 &&  <table className={styles.table}>
                          <thead>
                          <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Contact</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                              {
                                userList.length > 0 && userList.map((row,index) => (
                                  <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{row.name}</td>
                                  <td>{row.email}</td>
                                  <td>{row.contact}</td>
                                  <td>
                                    <Button onClick={()=> handleEditUser(row)}>Edit</Button>
                                    <br/>                              
                                    <Button onClick={() => deleteHandler(row.email)}>Delete</Button>
                                  </td>
                              </tr>  
                                  ))
                              }
                          </tbody>
                        </table> }
    </div>);
}

export default UserList;
