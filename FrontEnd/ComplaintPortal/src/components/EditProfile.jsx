import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useLocationData from '../hooks/useLocationData';

import useUpdateProfile from '../hooks/useUpdateProile';

const EditProfile = ({setEditProfileClicked}) => {
  const user = useSelector((store) => store.user.user);
  const updateProfile = useUpdateProfile();


  const [formData, setFormData] = useState({
    FirstName: user.FirstName || '',
    LastName: user.LastName || '',
    Phone: user.Phone || '',
    Address: user.Address || '',
    Pincode: user.Pincode || '',
    State: user.State || '',
    District: user.District || '',
    City: user.City || ''
  });

  const { states, districts, cities } = useLocationData(formData.State, formData.District);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
   await updateProfile(formData);
     setEditProfileClicked(false);
    
  };

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input name="FirstName" value={formData.FirstName} onChange={handleChange} className="w-full p-2 border rounded" placeholder="First Name" />
        <input name="LastName" value={formData.LastName} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Last Name" />
        <input name="Phone" value={formData.Phone} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Phone" />
        <input name="Address" value={formData.Address} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Address" />
        <input name="Pincode" value={formData.Pincode} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Pincode" />

        <select name="State" value={formData.State} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state.StateId} value={state.State}>{state.State}</option>
          ))}
        </select>

        <select name="District" value={formData.District} onChange={handleChange} disabled={!districts.length} className="w-full p-2 border rounded">
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district.DistrictID} value={district.District}>{district.District}</option>
          ))}
        </select>

        <select name="City" value={formData.City} onChange={handleChange} disabled={!cities.length} className="w-full p-2 border rounded">
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.CityID} value={city.City}>{city.City}</option>
          ))}
        </select>

        <button type="submit" className="btn w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
