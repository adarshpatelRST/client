import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../User/UserForm';
import UserList from '../User/UserList';
import '../../App.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    console.log("Fetching Users");
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  const handleAddOrUpdateUser = async (user) => {
    try {
      if (user._id) {
        const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, user);
        console.log('Updated user:', response.data);
      } else {
        const response = await axios.post('http://localhost:5000/api/users', user);
        console.log('Added new user:', response.data);
      }
      fetchUsers();
      setUserToEdit(null);
    } catch (err) {
      console.error('Error adding/updating user:', err.message);
    }
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    setUserToEdit(user);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      console.log('Deleted user with ID:', id);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };

  return (
    <div className='userContainer'>
      <h1 className='header'>User Management</h1>
      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      <UserForm onSubmit={handleAddOrUpdateUser} userToEdit={userToEdit} />
    </div>
  );
};

export default ManageUsers;
