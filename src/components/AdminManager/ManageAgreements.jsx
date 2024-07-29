import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'; // Import CSS for styling

const ManageAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [users, setUsers] = useState([]);
  const [agreementCategories, setAgreementCategories] = useState([]);
  const [formData, setFormData] = useState({
    AgreementName: '',
    AgreementCode: '',
    AgreementCategory: '',
    CreatedBy: '',
    UpdatedBy: '',
    IsActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentAgreementId, setCurrentAgreementId] = useState(null);

  useEffect(() => {
    const fetchAgreements = async () => {
      const res = await axios.get('http://localhost:5000/api/agreements');
      setAgreements(res.data);
    };
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    };

    const fetchAgreementCategories = async() => {
      const res = await axios.get('http://localhost:5000/api/agreementCategories');
      setAgreementCategories(res.data);
    };

    fetchUsers();
    fetchAgreements();
    fetchAgreementCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/agreements/${currentAgreementId}`, formData);
      setIsEditing(false);
      setCurrentAgreementId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/agreements', formData);
      setAgreements([...agreements, res.data]);
    }
    setFormData({
      AgreementName: '',
      AgreementCode: '',
      AgreementCategory: '',
      CreatedBy: '',
      UpdatedBy: '',
      IsActive: true
    });
    fetchAgreements();
  };

  const fetchAgreements = async () => {
    const res = await axios.get('http://localhost:5000/api/agreements');
    setAgreements(res.data);
  };

  const handleEdit = (agreement) => {
    setFormData({
      AgreementName: agreement.AgreementName,
      AgreementCode: agreement.AgreementCode,
      AgreementCategory: agreement.AgreementCategory.CategoryName,
      IsActive: agreement.IsActive
    });
    setIsEditing(true);
    setCurrentAgreementId(agreement._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/agreements/${id}`);
    fetchAgreements();
  };

  return (
    <div>
      <h1 className='headerContainer'> Manage Agreements </h1>
      <div className="container">
        {agreements.map((agreement) => (
          <div className="userCard" key={agreement._id}>
            <h4>{agreement.AgreementName}</h4>
            <p><strong>Code:</strong> {agreement.AgreementCode}</p>
            <p><strong>Category:</strong> {agreement.AgreementCategory.CategoryName}</p>
            <p><strong>Created By:</strong> {agreement.CreatedBy ? agreement.CreatedBy.UserName : "Unknown User"}</p>
            <p hidden={agreement.UpdatedBy ? false : true}><strong>Updated By:</strong> {agreement.UpdatedBy ? agreement.UpdatedBy.UserName : "Unknown User"}</p>
            <p>{agreement.IsActive ? 'Active' : 'Inactive'}</p>
            <div className='buttonContainer'>
            <button
              onClick={() => {
                console.log('Editing category:', agreement);
                handleEdit(agreement);
              }}
              className='editButton'
            >
              Edit
            </button>
            <button
              onClick={() => {
                console.log('Deleting category with ID:', agreement._id);
                handleDelete(agreement._id);
              }}
              className='deleteButton'
            >
              Delete
            </button>
          </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          name="AgreementName"
          value={formData.AgreementName}
          onChange={handleChange}
          placeholder='Agreement Name'
          required
          className='input'
        />
        <input
          type="text"
          name="AgreementCode"
          value={formData.AgreementCode}
          onChange={handleChange}
          placeholder='Agreement Code'
          required
          className='input'
        />
        <select
            name="AgreementCategory"
            value={formData.AgreementCategory}
            onChange={handleChange}
            placeholder='Agreement Category'
            className='input'
            required
        >
          <option value="">Agreement Category</option>
          {agreementCategories.map((agreementCategory) => (
            <option key={agreementCategory._id} value={agreementCategory._id}>
              {agreementCategory.CategoryName}
            </option>
          ))}
        </select>
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
      <button className='button' type="submit">{isEditing ? "Update Agreement" : "Add Agreement"}</button>
      </form>
    </div>
  );
};

export default ManageAgreements;
