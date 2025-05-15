import React, { useState } from 'react';
import useLocationData from '../hooks/useLocationData';
import useComplaintForm from '../hooks/useComplaintForm';
import useImageUpload from '../hooks/useImageUpload';
import FormFields from './FormFields';

const RegisterComplaint = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { states, districts, cities, wards } = useLocationData(selectedState, selectedDistrict, selectedCity);

  const { formData, handleChange, handleSubmit, message } = useComplaintForm({
    WardID: '',
    GeoLat: '',
    GeoLong: '',
    Description: '',
    ComplaintTypeID: ''
  });

  const { images, handleImageChange } = useImageUpload();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Complaint</h2>
      <form onSubmit={(e) => handleSubmit(e, images)} className="space-y-4">
        <FormFields
          states={states}
          districts={districts}
          cities={cities}
          wards={wards}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          selectedCity={selectedCity}
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedCity={setSelectedCity}
          formData={formData}
          handleChange={handleChange}
        />

        <div className="flex flex-col space-y-2">
          <label>Upload Images:</label>
          <input type="file" name="Image1" accept="image/*" onChange={handleImageChange} />
          <input type="file" name="Image2" accept="image/*" onChange={handleImageChange} />
          <input type="file" name="Image3" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
          Submit
        </button>

        {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterComplaint;
