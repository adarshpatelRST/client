import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const ManageTariffCoverageMappers = () => {
  const [mappers, setMappers] = useState([]);
  const [tariffs, setTariffs] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    TariffId: '',
    CoverageId: '',
    CreatedBy: '',
    UpdatedBy: '',
    IsActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentMapperId, setCurrentMapperId] = useState(null);

  useEffect(() => {
    const fetchMappers = async () => {
      const res = await axios.get('http://localhost:5000/api/tariffCoverageMappers');
      setMappers(res.data);
    };

    const fetchTariffs = async () => {
      const res = await axios.get('http://localhost:5000/api/tariffs');
      setTariffs(res.data);
    };

    const fetchCoverages = async () => {
      const res = await axios.get('http://localhost:5000/api/coverages');
      setCoverages(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    };

    fetchMappers();
    fetchTariffs();
    fetchCoverages();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchMappers = async () => {
    const res = await axios.get('http://localhost:5000/api/tariffCoverageMappers');
    setMappers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/tariffCoverageMappers/${currentMapperId}`, formData);
      setIsEditing(false);
      setCurrentMapperId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/tariffCoverageMappers', formData);
      setMappers([...mappers, res.data]);
    }
    setFormData({
      TariffId: '',
      CoverageId: '',
      CreatedBy: '',
      UpdatedBy: '',
      IsActive: true
    });
    fetchMappers();
  };

  const handleEdit = (mapper) => {
    const createdByUser = users.find(user => user._id === mapper.CreatedBy);
    setFormData({
      TariffId: mapper.TariffId,
      CoverageId: mapper.CoverageId,
      CreatedBy: createdByUser ? createdByUser.UserName : 'Unknown User',
      UpdatedBy: mapper.UpdatedBy,
      IsActive: mapper.IsActive
    });
    setIsEditing(true);
    setCurrentMapperId(mapper._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tariffCoverageMappers/${id}`);
    fetchMappers();
  };

  return (
    <div>
      <h1 className='headerContainer'>Manage Tariff Coverage Mappers</h1>
      <div className="container">
        {mappers.map((mapper) => (
          <div className="userCard" key={mapper._id}>
            <h4>{mapper.TariffId.TariffName} - {mapper.CoverageId.CoverageName}</h4>
            <p><strong>Created By:</strong> {mapper.CreatedBy ? mapper.CreatedBy.UserName : "Unknown User"}</p>
            <p hidden={mapper.UpdatedBy ? false : true}><strong>Updated By:</strong> {mapper.UpdatedBy ? mapper.UpdatedBy.UserName : "Unknown User"}</p>
            <p><strong>Status:</strong> {mapper.IsActive ? 'Active' : 'Inactive'}</p>
            <div className='buttonContainer'>
            <button className="editButton" onClick={() => handleEdit(mapper)}>Edit</button>
            <button className="deleteButton" onClick={() => handleDelete(mapper._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <select
          name="TariffId"
          value={formData.TariffId}
          onChange={handleChange}
          required
          className='input'
        >
          <option value="">Select Tariff</option>
          {tariffs.map((tariff) => (
            <option key={tariff._id} value={tariff._id}>
              {tariff.TariffName}
            </option>
          ))}
        </select>
        <select
          name="CoverageId"
          value={formData.CoverageId}
          onChange={handleChange}
          required
          className='input'
        >
          <option value="">Select Coverage</option>
          {coverages.map((coverage) => (
            <option key={coverage._id} value={coverage._id}>
              {coverage.CoverageName}
            </option>
          ))}
        </select>
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
        <button className="button" type="submit">{isEditing ? 'Update Mapper' : 'Add Mapper'}</button>
      </form>
    </div>
  );
};

export default ManageTariffCoverageMappers;
