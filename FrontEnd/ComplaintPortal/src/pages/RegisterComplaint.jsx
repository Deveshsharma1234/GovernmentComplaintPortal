import React, { useState } from 'react';
import useLocationData from '../hooks/useLocationData';
import useComplaintForm from '../hooks/useComplaintForm';
import useImageUpload from '../hooks/useImageUpload';
import FormFields from './FormFields';
import { useNavigate } from 'react-router';

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

// extracting location data from custom hook
  const { states, districts, cities, wards } = useLocationData(selectedState, selectedDistrict, selectedCity);
  
  //an intial state of object
  const initialState = {
    WardID: '',
    GeoLat: '',
    GeoLong: '',
    Description: '',
    ComplaintTypeID: ''
  };

  //form data and submit cust. hook
  const { formData, setFormData, handleChange, handleSubmit, message } = useComplaintForm(initialState);

  const { images, handleImageChange } = useImageUpload(); //custm. hook

  const handleFormSubmit = async (e) => {
    const success = await handleSubmit(e, images)
    if (success) {
      setFormData(initialState);
      navigate('/')
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-auto p-6 bg-white text-black shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Complaint</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <FormFields
          states={states}
          districts={districts}
          cities={cities}
          wards={wards}
          selectedState={selectedState} 
          selectedDistrict={selectedDistrict}
          selectedCity={selectedCity}
          selectedWard={selectedWard}
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedCity={setSelectedCity}
          setSelectedWard={setSelectedWard}
          formData={formData}
          handleChange={handleChange}
        />

        <div className="flex flex-col space-y-2">
          <label>Upload Images:</label>
          <input type="file" className='file-input file-input-info' style={{ backgroundColor: "white" }} name="Image1" accept="image/*" onChange={handleImageChange} />
          <input type="file" className='file-input file-input-info' style={{ backgroundColor: "white" }} name="Image2" accept="image/*" onChange={handleImageChange} />
          <input type="file" className='file-input file-input-info' style={{ backgroundColor: "white" }} name="Image3" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>

        {message && <p className="mt-4 text-center text-600 font-semibold">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterComplaint;
