// components/FormFields.jsx
import React, { useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation"; // Adjust path as needed

const FormFields = ({
  states, districts, cities, wards,
  selectedState, selectedDistrict, selectedCity,
  setSelectedState, setSelectedDistrict, setSelectedCity,
  formData, handleChange
}) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeoLocation();

  useEffect(() => {
    if (coords) {
      handleChange({ target: { name: "GeoLat", value: coords.latitude.toString() } });
      handleChange({ target: { name: "GeoLong", value: coords.longitude.toString() } });
    }
  }, [coords]);

  return (
    <>
      <select value={selectedState} onChange={(e) => {
        setSelectedState(e.target.value);
        setSelectedDistrict('');
        setSelectedCity('');
        handleChange({ target: { name: 'WardID', value: '' } });
      }} className="w-full border rounded p-2" required>
        <option value="">Select State</option>
        {states.map((s) => <option key={s.StateId} value={s.State}>{s.State}</option>)}
      </select>

      <select value={selectedDistrict} onChange={(e) => {
        setSelectedDistrict(e.target.value);
        setSelectedCity('');
        handleChange({ target: { name: 'WardID', value: '' } });
      }} className="w-full border rounded p-2" required>
        <option value="">Select District</option>
        {districts.map((d) => <option key={d.DistrictID} value={d.District}>{d.District}</option>)}
      </select>

      <select value={selectedCity} onChange={(e) => {
        setSelectedCity(e.target.value);
        handleChange({ target: { name: 'WardID', value: '' } });
      }} className="w-full border rounded p-2" required>
        <option value="">Select City</option>
        {cities.map((c) => <option key={c.CityID} value={c.City}>{c.City}</option>)}
      </select>

      <input list="wards" name="WardID" value={formData.WardID} onChange={handleChange}
        className="w-full border rounded p-2" placeholder="Select or type Ward" required />
      <datalist id="wards">
        {wards.map((w) => (
          <option key={w.WardID} value={w.WardID}>{w.WardName}</option>
        ))}
      </datalist>

      <input
        type="text"
        name="GeoLat"
        placeholder="Geo Latitude"
        value={formData.GeoLat}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <input
        type="text"
        name="GeoLong"
        placeholder="Geo Longitude"
        value={formData.GeoLong}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <textarea name="Description" placeholder="Complaint Description" onChange={handleChange}
        className="w-full border rounded p-2" required />
      <input type="number" name="ComplaintTypeID" placeholder="Complaint Type ID" onChange={handleChange}
        className="w-full border rounded p-2" required />

      {/* Optional: show user info if location isn't available */}
      {!isGeolocationAvailable && <p className="text-red-500 text-sm">Geolocation not supported by your browser.</p>}
      {!isGeolocationEnabled && <p className="text-red-500 text-sm">Please enable location to auto-fill coordinates.</p>}
    </>
  );
};

export default FormFields;
