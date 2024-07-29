import React, { useState, useEffect } from 'react';
import '../../App.css';

const UserForm = ({ onSubmit, userToEdit }) => {
  const [user, setUser] = useState({
    UserName: '',
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
  });

  useEffect(() => {
    if (userToEdit) {
      console.log('Editing user:', userToEdit);
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(`Changed ${name} to ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', user);
    onSubmit(user);
    setUser({ UserName: '', Email: '', Password: '', FirstName: '', LastName: ''});
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type="text"
        name="UserName"
        value={user.UserName}
        onChange={handleChange}
        placeholder="User Name"
        className='input'
        required
      />
      <input
        type="email"
        name="Email"
        value={user.Email}
        onChange={handleChange}
        placeholder="Email"
        className='input'
        required
      />
      <input
        type="password"
        name="Password"
        value={user.Password}
        onChange={handleChange}
        placeholder="Password"
        className='input'
        required
      />
      <input
        type="FirstName"
        name="FirstName"
        value={user.FirstName}
        onChange={handleChange}
        placeholder="First Name"
        className='input'
        required
      />
      <input
        type="LastName"
        name="LastName"
        value={user.LastName}
        onChange={handleChange}
        placeholder="Last Name"
        className='input'
        required
      />
      <button type="submit" className='button'>
        {userToEdit ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
