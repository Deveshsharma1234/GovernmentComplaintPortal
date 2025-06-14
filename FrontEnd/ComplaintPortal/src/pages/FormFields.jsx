import React, { useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import useComplaintData from "../hooks/useComplaintData";

const FormFields = ({
  states, districts, cities, wards,
  selectedState, selectedDistrict, selectedCity,
  setSelectedState, setSelectedDistrict, setSelectedCity, setSelectedWard, selectedWard,
  formData, handleChange
}) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeoLocation();
  const { complaintTypes, complaintLoading, complaintError } = useComplaintData();

  useEffect(() => {
    if (coords) {
      handleChange({ target: { name: "GeoLat", value: coords.latitude.toString() } });
      handleChange({ target: { name: "GeoLong", value: coords.longitude.toString() } });
    }
  }, [coords]);

  states.sort((a, b) => a.State.toLowerCase().localeCompare(b.State.toLowerCase()));
  cities.sort((a, b) => a.City.toLowerCase().localeCompare(b.City.toLowerCase()));
  districts.sort((a, b) => a.District.toLowerCase().localeCompare(b.District.toLowerCase()));

  return (
    <>
      {/* State */}
      <select
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedDistrict('');
          setSelectedCity('');
          setSelectedWard('');
          handleChange({ target: { name: 'WardID', value: '' } });
        }}
        className="select w-full border border-gray-300 bg-white text-black p-2 rounded focus:ring-2 focus:ring-purple-300"
        required
      >
        <option value="">Select State</option>
        {states.map((s) => <option key={s.StateId} value={s.State}>{s.State}</option>)}
      </select>

      {/* District */}
      <select
        value={selectedDistrict}
        onChange={(e) => {
          setSelectedDistrict(e.target.value);
          setSelectedCity('');
          setSelectedWard('');
          handleChange({ target: { name: 'WardID', value: '' } });
        }}
        className="select w-full border border-gray-300 bg-white text-black p-2 rounded focus:ring-2 focus:ring-purple-300"
        required
      >
        <option value="">Select District</option>
        {districts.map((d) => <option key={d.DistrictID} value={d.District}>{d.District}</option>)}
      </select>

      {/* City */}
      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          setSelectedWard('');
          handleChange({ target: { name: 'WardID', value: '' } });
        }}
        className="select w-full border border-gray-300 bg-white text-black p-2 rounded focus:ring-2 focus:ring-purple-300"
        required
      >
        <option value="">Select City</option>
        {cities.map((c) => <option key={c.CityID} value={c.City}>{c.City}</option>)}
      </select>

      {/* Ward */}
      {wards.length !== 0 ? (
        <select
          value={selectedWard}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedWard(value);
            handleChange({ target: { name: 'WardID', value } });
          }}
          className="select w-full border border-gray-300 bg-white text-black p-2 rounded focus:ring-2 focus:ring-purple-300"
          required
        >
          <option value="">Select Ward</option>
          {wards.map((w) => (
            <option key={w.WardID} value={w.WardID}>{w.AreaCovered}</option>
          ))}
        </select>
      ) : (
        <>
          <input
            list="wards"
            name="WardID"
            value={formData.WardID}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-black p-2 rounded"
            placeholder="Ward ID"
            required
          />
          <datalist id="wards">
            {wards.map((w) => (
              <option key={w.WardID} value={w.WardID}>{w.WardName}</option>
            ))}
          </datalist>
        </>
      )}

      {/* Geo Coordinates */}
      <input
        type="text"
        name="GeoLat"
        placeholder="Geo Latitude"
        value={formData.GeoLat}
        onChange={handleChange}
        className="w-full border border-gray-300 bg-white text-black p-2 rounded"
        required
      />
      <input
        type="text"
        name="GeoLong"
        placeholder="Geo Longitude"
        value={formData.GeoLong}
        onChange={handleChange}
        className="w-full border border-gray-300 bg-white text-black p-2 rounded"
        required
      />

      {/* Complaint Types */}
      <div className="w-full">
        {complaintLoading && <p className="text-sm text-gray-500">Loading complaint types...</p>}
        {complaintError && <p className="text-sm text-red-500">Error fetching complaint types</p>}

        <select
          name="ComplaintTypeID"
          onChange={handleChange}
          value={formData.ComplaintTypeID || ""}
          className="select w-full border border-gray-300 bg-white text-black p-2 rounded focus:ring-2 focus:ring-purple-300"
          required
        >
          <option value="">Select a Complaint Type</option>
          {complaintTypes.map((type) => (
            <option key={type.ComplaintTypeID} value={type.ComplaintTypeID}>
              {type.ComplaintType}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <textarea
        name="Description"
        placeholder="Complaint Description"
        onChange={handleChange}
        value={formData.Description || ""}
        className="w-full border border-gray-300 bg-white text-black p-2 rounded mt-2"
        required
      />

      {/* Location Warnings */}
      {!isGeolocationAvailable && (
        <p className="text-red-500 text-sm">Geolocation not supported by your browser.</p>
      )}
      {!isGeolocationEnabled && (
        <p className="text-red-500 text-sm">Please enable location to auto-fill coordinates.</p>
      )}
    </>
  );
};

export default FormFields;
