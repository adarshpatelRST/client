import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const ManageTariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    TariffName: '',
    TariffOwnerId: '',
    ChannelCode: '',
    AgreementCode: '',
    AccountNumber: '',
    CreatedBy: '',
    UpdatedBy: '',
    IsActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTariffId, setCurrentTariffId] = useState(null);

  useEffect(() => {
    const fetchTariffs = async () => {
      const res = await axios.get('http://localhost:5000/api/tariffs');
      setTariffs(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    };

    fetchTariffs();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTariffs = async () => {
    const res = await axios.get('http://localhost:5000/api/tariffs');
    setTariffs(res.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/tariffs/${currentTariffId}`, formData);
      setIsEditing(false);
      setCurrentTariffId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/tariffs', formData);
      setTariffs([...tariffs, res.data]);
    }
    setFormData({
      TariffName: '',
      TariffOwnerId: '',
      ChannelCode: '',
      AgreementCode: '',
      AccountNumber: '',
      CreatedBy: '',
      UpdatedBy: '',
      IsActive: true
    });
    fetchTariffs();
  };

  const handleEdit = (tariff) => {
    const createdByUser = users.find(user => user._id === tariff.CreatedBy);
    setFormData({
      TariffName: tariff.TariffName,
      TariffOwnerId: tariff.TariffOwnerId,
      ChannelCode: tariff.ChannelCode,
      AgreementCode: tariff.AgreementCode,
      AccountNumber: tariff.AccountNumber,
      CreatedBy: createdByUser ? createdByUser.UserName : 'Unknown User',
      UpdatedBy: tariff.UpdatedBy,
      IsActive: tariff.IsActive
    });
    setIsEditing(true);
    setCurrentTariffId(tariff._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tariffs/${id}`);
    fetchTariffs();
  };

  return (
    <div>
      <h1 className='headerContainer'>Manage Tariffs</h1>
      <div className="container">
        {tariffs.map((tariff) => (
          <div className="userCard" key={tariff._id}>
            <h4>{tariff.TariffName}</h4>
            <p><strong>Tariff Owner:</strong> {tariff.TariffOwnerId.UserName}</p>
            <p><strong>Channel Code:</strong> {tariff.ChannelCode}</p>
            <p><strong>Agreement Code:</strong> {tariff.AgreementCode}</p>
            <p><strong>Account Number:</strong> {tariff.AccountNumber}</p>
            <p><strong>Created By:</strong> {tariff.CreatedBy ? tariff.CreatedBy.UserName : "Unknown User"}</p>
            <p hidden={tariff.UpdatedBy ? false : true}><strong>Updated By:</strong> {tariff.UpdatedBy ? tariff.UpdatedBy.UserName : "Unknown User"}</p>
            <p><strong>Status:</strong> {tariff.IsActive ? 'Active' : 'Inactive'}</p>
            <div className='buttonContainer'>
            <button className="editButton" onClick={() => handleEdit(tariff)}>Edit</button>
            <button className="deleteButton" onClick={() => handleDelete(tariff._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="TariffName"
            value={formData.TariffName}
            onChange={handleChange}
            required
            className='input'
            placeholder='Tariff Name'
          />
          <select
            name="TariffOwnerId"
            value={formData.TariffOwnerId}
            onChange={handleChange}
            required
            className='input'
          >
            <option value="">Tariff Owner</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.UserName}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="ChannelCode"
            value={formData.ChannelCode}
            onChange={handleChange}
            required
            className='input'
            placeholder='Channel Code'
          />
          <input
            type="text"
            name="AgreementCode"
            value={formData.AgreementCode}
            onChange={handleChange}
            required
            className='input'
            placeholder='Agreement Code'
          />
          <input
            type="text"
            name="AccountNumber"
            value={formData.AccountNumber}
            onChange={handleChange}
            required
            className='input'
            placeholder='Account Number'
          />
          <select
            name="CreatedBy"
            value={formData.CreatedBy}
            onChange={handleChange}
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
        <button className="button" type="submit">{isEditing ? 'Update Tariff' : 'Add Tariff'}</button>
      </form>
    </div>
  );
};

export default ManageTariffs;
