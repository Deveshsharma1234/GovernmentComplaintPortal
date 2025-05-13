import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Register = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Address: '',
    Pincode: '',
    State: '',
    District: '',
    City: '',
    Password: ''
  });

  // Fetch all states on component mount
  useEffect(() => {
    axios.get(BASE_URL+"/getAllStates",
        {
            withCredentials: true,
        
        }
       
    )
      .then(res => setStates(res.data.states))
      .catch(err => console.error(err));
  }, []);

  // Fetch districts when a state is selected
  useEffect(() => {
    if (formData.State) {
      axios.get(`/api/districts?state=${formData.State}`)
        .then(res => setDistricts(res.data))
        .catch(err => console.error(err));
    } else {
      setDistricts([]);
    }
  }, [formData.State]);

  // Fetch cities when a district is selected
  useEffect(() => {
    if (formData.District) {
      axios.get(`/api/cities?district=${formData.District}`)
        .then(res => setCities(res.data))
        .catch(err => console.error(err));
    } else {
      setCities([]);
    }
  }, [formData.District]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', formData)
      .then(res => {
        alert("User registered successfully!");
        // Optionally, clear form or redirect
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required />

        <label htmlFor="Email">Email:</label>
        <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

        <label htmlFor="Phone">Phone:</label>
        <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} required />

        <label htmlFor="Address">Address:</label>
        <input type="text" name="Address" value={formData.Address} onChange={handleChange} required />

        <label htmlFor="Pincode">Pincode:</label>
        <input type="text" name="Pincode" value={formData.Pincode} onChange={handleChange} required />

        <label htmlFor="State">State:</label>
        <select name="State" value={formData.State} onChange={handleChange} required>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state.StateId} value={state.State}>{state.State}</option>
            
            
          ))}
        </select>

        <label htmlFor="District">District:</label>
        <select name="District" value={formData.District} onChange={handleChange} required disabled={!districts.length}>
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district.id} value={district.name}>{district.name}</option>
          ))}
        </select>

        <label htmlFor="City">City:</label>
        <select name="City" value={formData.City} onChange={handleChange} required disabled={!cities.length}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.id} value={city.name}>{city.name}</option>
          ))}
        </select>

        <label htmlFor="Password">Password:</label>
        <input type="password" name="Password" value={formData.Password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
