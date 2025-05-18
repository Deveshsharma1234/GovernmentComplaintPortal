import React, { useState, useEffect } from 'react';
import useComplaintStatusBadge from '../../hooks/useComplaintStatusBadge';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const GetAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  // Filter options
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]); // To store all possible status options

  // Selected filters
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // Store Status Name for filtering

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [newStatus, setNewStatus] = useState(''); // Store Status Name for updating

  const getStatusBadge = useComplaintStatusBadge();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 6;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(BASE_URL + "/complaints", { withCredentials: true });
        const data = res.data.complaints;

        setComplaints(data);
        setFilteredComplaints(data);

        setStates([...new Set(data.map(c => c.State))]);
        // We can directly get the current statuses from the complaint data for display
        // But we need all possible statuses for the filter and modal dropdown
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };


    const fetchAllStatuses = async () => {
      try {
        const statusRes = await axios.get(BASE_URL + "/statuses", { withCredentials: true });
        setAllStatuses(statusRes.data.status);
      } catch (error) {
        console.error("Error fetching all statuses:", error);
      }
    };

    fetchComplaints();
    fetchAllStatuses();
  }, []);

  // Dependent filter logic
  useEffect(() => {
    const filtered = complaints.filter(c => !selectedState || c.State === selectedState);
    setDistricts([...new Set(filtered.map(c => c.District))]);
    setSelectedDistrict('');
    setSelectedCity('');
    setSelectedWard('');
  }, [selectedState, complaints]);

  useEffect(() => {
    const filtered = complaints.filter(c =>
      (!selectedState || c.State === selectedState) &&
      (!selectedDistrict || c.District === selectedDistrict)
    );
    setCities([...new Set(filtered.map(c => c.City))]);
    setSelectedCity('');
    setSelectedWard('');
  }, [selectedDistrict, selectedState, complaints]);

  useEffect(() => {
    const filtered = complaints.filter(c =>
      (!selectedState || c.State === selectedState) &&
      (!selectedDistrict || c.District === selectedDistrict) &&
      (!selectedCity || c.City === selectedCity)
    );
    setWards([...new Set(filtered.map(c => c.WardID))]);
    setSelectedWard('');
  }, [selectedCity, selectedDistrict, selectedState, complaints]);

  // Filter complaints (now filtering by StatusName)
  useEffect(() => {
    const filtered = complaints.filter(c =>
      (!selectedState || c.State === selectedState) &&
      (!selectedDistrict || c.District === selectedDistrict) &&
      (!selectedCity || c.City === selectedCity) &&
      (!selectedWard || c.WardID === parseInt(selectedWard)) &&
      (!selectedStatus || c.StatusName === selectedStatus) // Filter by StatusName
    );
    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [selectedState, selectedDistrict, selectedCity, selectedWard, selectedStatus, complaints]);

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  // Reset filter handler
  const resetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedCity('');
    setSelectedWard('');
    setSelectedStatus('');
  };

  // Modal Handlers
  const openModal = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComplaintId(null);
    setNewStatus('');
  };

  // Update Complaint Status (Now sending Status ID based on selected Status Name)
  const handleUpdateStatus = async () => {
    if (!selectedComplaintId || !newStatus) {
      alert("Please select a new status.");
      return;
    }

    const selectedStatusObject = allStatuses.find(status => status.Status === newStatus);
    const statusIdToSend = selectedStatusObject ? selectedStatusObject.StatusID : null;


    if (!statusIdToSend) {
      alert("Error: Could not find Status ID for the selected status.");
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/complaints",
        { id: selectedComplaintId, Status: statusIdToSend }, // Send StatusID
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("Complaint status updated:", res.data);
        // Refresh complaints
        const updatedComplaintsRes = await axios.get(BASE_URL + "/complaints", { withCredentials: true });
        setComplaints(updatedComplaintsRes.data.complaints);
        setFilteredComplaints(updatedComplaintsRes.data.complaints);
        closeModal();
      } else {
        console.error("Failed to update complaint status:", res.data);
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating complaint status:", err);
      alert("Error updating status.");
    }
  };

  // Delete Complaint
  const handleDeleteComplaint = async () => {
    if (!selectedComplaintId) return;
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const res = await axios.delete(BASE_URL + `/complaints/`, { // Note the trailing slash in the API endpoint
          withCredentials: true,
          data: { ComplaintID: selectedComplaintId }
        });
        if (res.status === 200) {
          console.log("Complaint deleted:", res.data);
          // Refresh complaints after deletion
          const updatedComplaintsRes = await axios.get(BASE_URL + "/complaints", { withCredentials: true });
          setComplaints(updatedComplaintsRes.data.complaints);
          setFilteredComplaints(updatedComplaintsRes.data.complaints);
          closeModal();
        } else {
          console.error("Failed to delete complaint:", res.data);
          alert("Failed to delete complaint.");
        }
      } catch (err) {
        console.error("Error deleting complaint:", err);
        alert("Error deleting complaint.");
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">📋 All Complaints</h2>

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap mb-4 px-2">
        <select className="select select-bordered" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">All States</option>
          {states.map((state, idx) => <option key={idx} value={state}>{state}</option>)}
        </select>

        <select className="select select-bordered" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState}>
          <option value="">All Districts</option>
          {districts.map((district, idx) => <option key={idx} value={district}>{district}</option>)}
        </select>

        <select className="select select-bordered" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedDistrict}>
          <option value="">All Cities</option>
          {cities.map((city, idx) => <option key={idx} value={city}>{city}</option>)}
        </select>

        <select className="select select-bordered" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedCity}>
          <option value="">All Wards</option>
          {wards.map((ward, idx) => <option key={idx} value={ward}>{ward}</option>)}
        </select>

        <select
          className="select select-bordered"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {allStatuses.map((status) => (
            <option key={status.StatusID} value={status.Status}>
              {status.Status}
            </option>
          ))}
        </select>

        <button onClick={resetFilters} className="btn btn-outline btn-error">Reset Filters</button>
      </div>

      {/* Complaints Grid */}
      {currentComplaints.length === 0 ? (
        <p className="text-gray-500 text-center">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentComplaints.map((complaint) => (
            <div key={complaint.ComplaintID} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-purple-300 transition-shadow duration-300 relative">
              <p className="text-sm text-gray-500 mb-1">Complaint ID: #{complaint.ComplaintID}</p>
              <p className="text-base font-medium mb-2 text-gray-800">{complaint.Description}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Status:</span> {getStatusBadge(complaint.Status)}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Status Name:</span> {complaint.StatusName}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Created By:</span> {complaint.CreatedBy}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">State:</span> {complaint.State}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">City:</span> {complaint.City}</p>
              <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Date:</span> {new Date(complaint.CreatedDate).toLocaleString()}</p>

              <div className="grid grid-cols-3 gap-2 mt-3">
                {[complaint.Image1, complaint.Image2, complaint.Image3].map((img, i) =>
                  img ? (
                    <img
                      key={i}
                      src={`${BASE_URL}${img}`}
                      alt={`Complaint ${complaint.ComplaintID} img${i + 1}`}
                      className="w-full h-24 object-cover rounded-md border border-purple-200"
                    />
                  ) : null
                )}
              </div>

              {/* Edit/Delete Button */}
              <div className="absolute top-2 right-2">
                <button onClick={() => openModal(complaint.ComplaintID)} className="btn btn-sm btn-outline btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit/Delete Modal */}
      {isModalOpen && selectedComplaintId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Complaint #{selectedComplaintId}</h3>

            {/* Edit Status Section */}
            <div className="mb-4">
              <label htmlFor="new-status" className="label">
                <span className="label-text">Update Status</span>
              </label>
              <select
                id="new-status"
                className="select select-bordered w-full"
                onChange={(e) => setNewStatus(e.target.value)}
                value={newStatus}
              >
                <option value="" disabled>Select New Status</option>
                {allStatuses.map((status) => (
                  <option key={status.StatusID} value={status.Status}>
                    {status.Status}
                  </option>
                ))}
              </select>
              <div className="modal-action justify-start mt-2">
                <button onClick={handleUpdateStatus} className="btn btn-primary btn-sm">Update Status</button>
              </div>
            </div>

            {/* Delete Complaint Section */}
            <div className="modal-action justify-between">
              <button className="btn btn-error btn-sm" onClick={handleDeleteComplaint}>Delete Complaint</button>
              <button className="btn btn-sm" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllComplaints;