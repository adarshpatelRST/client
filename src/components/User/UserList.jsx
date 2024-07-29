import React from 'react';
import '../../App.css';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className='container'>
      {users.map((user) => (
        <div key={user._id} className='userCard'>
          <h3>{user.UserName}</h3>
          <h4>{user.FirstName} {user.LastName}</h4>
          <p><strong>Email:</strong> {user.Email}</p>
          <div className='buttonContainer'>
            <button
              onClick={() => {
                console.log('Editing user:', user);
                onEdit(user);
              }}
              className='editButton'
            >
              Edit
            </button>
            <button
              onClick={() => {
                console.log('Deleting user with ID:', user._id);
                onDelete(user._id);
              }}
              className='deleteButton'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
