import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const ManageAgreementCategories = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    CategoryName: '',
    CreatedBy: '',
    UpdatedBy: '',
    IsActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/agreementCategories');
      setCategories(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    };

    fetchCategories();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/agreementCategories/${currentCategoryId}`, formData);
      setIsEditing(false);
      setCurrentCategoryId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/agreementCategories', formData);
      setCategories([...categories, res.data]);
    }
    setFormData({
      CategoryName: '',
      CreatedBy: '',
      UpdatedBy: '',
      IsActive: true
    });
    fetchCategories();
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/agreementCategories');
    setCategories(res.data);
  };

  const handleEdit = (category) => {
    setFormData({
      CategoryName: category.CategoryName,
      IsActive: category.IsActive
    });
    setIsEditing(true);
    setCurrentCategoryId(category._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/agreementCategories/${id}`);
    fetchCategories();
  };

  return (
    <div>
      <h1 className='headerContainer'>Manage Agreement Categories</h1>
      <div className='container'>
      {categories.map((category) => (
        <div key={category._id} className='userCard'>
          <h3>{category.CategoryName}</h3>
          <h4>CreatedBy : {category.CreatedBy ? category.CreatedBy.UserName : "Undefined User"} </h4>
          <h4 hidden={category.UpdatedBy ? false : true}>UpdatedBy : {category.UpdatedBy ? category.UpdatedBy.UserName : "Undefined User"} </h4>
          <p>{category.IsActive ? 'Active' : 'Inactive'}</p>
          <div className='buttonContainer'>
            <button
              onClick={() => {
                console.log('Editing category:', category);
                handleEdit(category);
              }}
              className='editButton'
            >
              Edit
            </button>
            <button
              onClick={() => {
                console.log('Deleting category with ID:', category._id);
                handleDelete(category._id);
              }}
              className='deleteButton'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="CategoryName"
            value={formData.CategoryName}
            onChange={handleChange}
            placeholder='Category Name'
            className='input'
            required
        />
        <select
            name="CreatedBy"
            value={formData.CreatedBy}
            onChange={handleChange}
            placeholder='CreatedBy'
            className='input'
            required = {!isEditing}
            hidden = {isEditing}
        >
          <option value="">Created By</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.UserName}
            </option>
          ))}
        </select>
        <select
            name="UpdatedBy"
            value={formData.UpdatedBy}
            onChange={handleChange}
            placeholder='UpdatedBy'
            className='input'
            required = {isEditing}
            hidden = {!isEditing}
          >
            <option value="">Updated By</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.UserName}
              </option>
            ))}
        </select>
        <label>
          <input
            type="checkbox"
            name="IsActive"
            checked={formData.IsActive}
            onChange={(e) => setFormData({ ...formData, IsActive: e.target.checked })}
          />
          Is Active
        </label>
        <br></br>
        <button className="button" type="submit">{isEditing ? 'Update Category' : 'Add Category'}</button>
      </form>
    </div>
  );
};

export default ManageAgreementCategories;
