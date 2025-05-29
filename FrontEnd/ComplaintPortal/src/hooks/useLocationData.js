import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const useLocationData = (selectedState, selectedDistrict,selectedCity) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
   const [wards, setWards] = useState([]);

  // Fetch all states
  useEffect(() => {
    axios.get(`${BASE_URL}/getAllStates`, { withCredentials: true })
      .then(res => {
        const stateData = res.data?.states|| res.data?.Result|| [];
        console.log(stateData);
        setStates(stateData);
      })
      .catch(err => {
        console.error('Failed to fetch states:', err);
        setStates([]);
      });
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (selectedState) {
      const stateObj = states.find(state => state.State === selectedState);
      if (stateObj) {
        axios.get(`${BASE_URL}/district/${stateObj.StateId}`, { withCredentials: true })
          .then(res => {
            const districtData = res.data?.districts || [];
            setDistricts(districtData);
          })
          .catch(err => {
            console.error('Failed to fetch districts:', err);
            setDistricts([]);
          });
      }
    } else {
      setDistricts([]);
    }
  }, [selectedState, states]);

  // Fetch cities when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const districtObj = districts.find(d => d.District === selectedDistrict);
      if (districtObj) {
        axios.get(`${BASE_URL}/cities/${districtObj.DistrictID}`, { withCredentials: true })
          .then(res => {
            const cityData = res.data?.cities || [];
            setCities(cityData);
          })
          .catch(err => {
            console.error('Failed to fetch cities:', err);
            setCities([]);
          });
      }
    } else {
      setCities([]);
    }
  }, [selectedDistrict, districts]);

   // Fetch wards when city changes
  useEffect(() => {
    if (selectedCity) {
      const cityObj = cities.find(c => c.City === selectedCity);
      if (cityObj) {
        axios.get(`${BASE_URL}/wards/${cityObj.CityID}`, { withCredentials: true })
          .then(res => {
            const wardData = res.data?.wards || [];
            setWards(wardData);
          })
          .catch(err => {
            console.error('Failed to fetch wards:', err);
            setWards([]);
          });
      }
    } else {
      setWards([]);
    }
  }, [selectedCity, cities]);

  return { states, districts, cities,wards  };
};

export default useLocationData;
