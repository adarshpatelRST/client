import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const ManageCoverages = () => {
  const [coverages, setCoverages] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    CoverageName: '',
    CoverageCode: '',
    Limit: '',
    CoveredCountry: '',
    DriverCounts: '',
    Amount: '',
    CreatedBy: '',
    UpdatedBy: '',
    IsActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentCoverageId, setCurrentCoverageId] = useState(null);

  useEffect(() => {
    const fetchCoverages = async () => {
      const res = await axios.get('http://localhost:5000/api/coverages');
      setCoverages(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    };

    fetchCoverages();
    fetchUsers();
  }, []);

  const fetchCoverages = async () => {
    const res = await axios.get('http://localhost:5000/api/coverages');
    setCoverages(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/coverages/${currentCoverageId}`, formData);
      setIsEditing(false);
      setCurrentCoverageId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/coverages', formData);
      setCoverages([...coverages, res.data]);
    }
    setFormData({
      CoverageName: '',
      CoverageCode: '',
      Limit: '',
      CoveredCountry: '',
      DriverCounts: '',
      Amount: '',
      CreatedBy: '',
      UpdatedBy: '',
      IsActive: true
    });
    fetchCoverages();
  };

  const handleEdit = (coverage) => {
    setFormData({
      CoverageName: coverage.CoverageName,
      CoverageCode: coverage.CoverageCode,
      Limit: coverage.Limit,
      CoveredCountry: coverage.CoveredCountry,
      DriverCounts: coverage.DriverCounts,
      Amount: coverage.Amount.$numberDecimal,
      IsActive: coverage.IsActive
    });
    setIsEditing(true);
    setCurrentCoverageId(coverage._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/coverages/${id}`);
    fetchCoverages();
  };

  return (
    <div>
      <h1 className='headerContainer'>Manage Coverages</h1>
      <div className="container">
        {coverages.map((coverage) => (
          <div className="userCard" key={coverage._id}>
            <h4>{coverage.CoverageName}</h4>
            <p><strong>Coverage Code:</strong> {coverage.CoverageCode}</p>
            <p><strong>Limit:</strong> {coverage.Limit}</p>
            <p><strong>Covered Country:</strong> {coverage.CoveredCountry}</p>
            <p><strong>Driver Counts:</strong> {coverage.DriverCounts}</p>
            <p><strong>Amount:</strong> {coverage.Amount.$numberDecimal}</p>
            <p><strong>Created By:</strong> {coverage.CreatedBy ? coverage.CreatedBy.UserName : "Unknown User"}</p>
            <p hidden={coverage.UpdatedBy ? false : true}><strong>Updated By:</strong> {coverage.UpdatedBy ? coverage.UpdatedBy.UserName : "Unknown User"}</p>
            <p><strong>Status:</strong> {coverage.IsActive ? 'Active' : 'Inactive'}</p>
            <div className='buttonContainer'>
            <button className="editButton" onClick={() => handleEdit(coverage)}>Edit</button>
            <button className="deleteButton" onClick={() => handleDelete(coverage._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="CoverageName"
          value={formData.CoverageName}
          onChange={handleChange}
          required
          className='input'
          placeholder="Coverage Name"
        />
        <input
          type="text"
          name="CoverageCode"
          value={formData.CoverageCode}
          onChange={handleChange}
          required
          className='input'
          placeholder="Coverage Code"
        />
        <input
          type="number"
          name="Limit"
          value={formData.Limit}
          onChange={handleChange}
          required
          className='input'
          placeholder="Limit"
        />
        <input
          type="text"
          name="CoveredCountry"
          value={formData.CoveredCountry}
          onChange={handleChange}
          required
          className='input'
          placeholder="Covered Country"
        />
        <input
          type="number"
          name="DriverCounts"
          value={formData.DriverCounts}
          onChange={handleChange}
          required
          className='input'
          placeholder="Driver Counts"
        />
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            required
            className='input'
            placeholder="Amount"
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
        <button className="button" type="submit">{isEditing ? 'Update Coverage' : 'Add Coverage'}</button>
      </form>
    </div>
  );
};

export default ManageCoverages;
