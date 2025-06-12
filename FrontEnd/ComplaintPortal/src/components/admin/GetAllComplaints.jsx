import React, { useState, useEffect } from 'react';
import useComplaintStatusBadge from '../../hooks/useComplaintStatusBadge';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import apiClient from '../../utils/apiClient';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const GetAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const getStatusBadge = useComplaintStatusBadge();
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 6;

  const user = useSelector(store => store.user.user);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await apiClient.get(BASE_URL + "/complaints", { withCredentials: true });
        const data = res.data.complaints;
        setComplaints(data);
        setFilteredComplaints(data);
        setStates([...new Set(data.map(c => c.State))]);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    const fetchAllStatuses = async () => {
      try {
        const statusRes = await apiClient.get(BASE_URL + "/statuses", { withCredentials: true });
        setAllStatuses(statusRes.data.status);
      } catch (error) {
        console.error("Error fetching all statuses:", error);
      }
    };

    fetchComplaints();
    fetchAllStatuses();
  }, []);

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

  useEffect(() => {
    const filtered = complaints.filter(c =>
      (!selectedState || c.State === selectedState) &&
      (!selectedDistrict || c.District === selectedDistrict) &&
      (!selectedCity || c.City === selectedCity) &&
      (!selectedWard || c.WardID === parseInt(selectedWard)) &&
      (!selectedStatus || c.StatusName === selectedStatus)
    );
    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [selectedState, selectedDistrict, selectedCity, selectedWard, selectedStatus, complaints]);

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const resetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedCity('');
    setSelectedWard('');
    setSelectedStatus('');
  };

  const openModal = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComplaintId(null);
    setNewStatus('');
  };

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
      const res = await apiClient.patch(
        BASE_URL + "/complaints",
        { id: selectedComplaintId, Status: statusIdToSend },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // console.log("Complaint status updated:", res.data.message);
        toast.success(res.data.message);
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

  const handleDeleteComplaint = async () => {
    if (!selectedComplaintId) return;
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const res = await apiClient.delete(BASE_URL + `/complaints/`, {
          withCredentials: true,
          data: { ComplaintID: selectedComplaintId }
        });
        if (res.status === 200) {
          console.log("Complaint deleted:", res.data);
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

  const handleCloseFilters = () => {
    setIsAccordionOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-teal-50 to-gray-100 p-6">
      <h2 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">
        📋 Complaints Dashboard
      </h2>

      {/* Filters Accordion */}
      <div className="sticky top-0 z-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6">
        <div className="collapse collapse-arrow bg-white rounded-lg">
          <input
            type="checkbox"
            checked={isAccordionOpen}
            onChange={() => setIsAccordionOpen(!isAccordionOpen)}
          />
          <div className="collapse-title text-lg font-semibold text-indigo-900">
            Filter Complaints
          </div>
          <div className="collapse-content">
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <select
                className="select select-bordered select-md bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">All States</option>
                {states.map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>

              <select
                className="select select-bordered select-md bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">All Districts</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>{district}</option>
                ))}
              </select>

              <select
                className="select select-bordered select-md bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedDistrict}
              >
                <option value="">All Cities</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>

              <select
                className="select select-bordered select-md bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                disabled={!selectedCity}
              >
                <option value="">All Wards</option>
                {wards.map((ward, idx) => (
                  <option key={idx} value={ward}>{ward}</option>
                ))}
              </select>

              <select
                className="select select-bordered select-md bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
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

              <button
                onClick={resetFilters}
                className="btn btn-outline btn-error btn-md hover:bg-red-600 hover:text-white transition-colors"
              >
                Reset Filters
              </button>

              <button
                onClick={handleCloseFilters}
                className="btn btn-primary btn-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints Grid */}
      {currentComplaints.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentComplaints.map((complaint) => (
            <div
              key={complaint.ComplaintID}
              className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 border border-gray-100"
            >
              <p className="text-sm text-gray-500 font-medium mb-2">
                Complaint ID: #{complaint.ComplaintID}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                {complaint.Description}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-semibold text-indigo-700">Status:</span> {getStatusBadge(complaint.Status)}</p>
                <p><span className="font-semibold text-indigo-700">Status Name:</span> {complaint.StatusName}</p>
                <p><span className="font-semibold text-indigo-700">Created By:</span> {complaint.CreatedBy}</p>
                <p><span className="font-semibold text-indigo-700">State:</span> {complaint.State}</p>
                <p><span className="font-semibold text-indigo-700">City:</span> {complaint.City}</p>
                <p><span className="font-semibold text-indigo-700">Date:</span> {new Date(complaint.CreatedDate).toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[complaint.Image1, complaint.Image2, complaint.Image3].map((img, i) =>
                  img ? (
                    <img
                      key={i}
                      src={`${BASE_URL}${img}`}
                      alt={`Complaint ${complaint.ComplaintID} img${i + 1}`}
                      className="w-full h-28 object-cover rounded-lg border border-indigo-100 hover:scale-105 transition-transform"
                    />
                  ) : null
                )}
              </div>

              <div className="absolute top-4 right-4">
                <button
                  onClick={() => openModal(complaint.ComplaintID)}
                  className="btn btn-sm btn-circle btn-outline btn-indigo-600 hover:bg-indigo-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-md ${currentPage === i + 1
                  ? 'btn-primary bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'btn-outline border-indigo-300 text-indigo-600 hover:bg-indigo-100'
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit/Delete Modal */}
      {isModalOpen && selectedComplaintId && (
        <div className="modal modal-open transition-all duration-300">
          <div className="modal-box bg-white rounded-xl shadow-2xl max-w-md">
            <h3 className="font-bold text-2xl text-indigo-900 mb-6">
              Edit Complaint #{selectedComplaintId}
            </h3>

            <div className="mb-6">
              <label htmlFor="new-status" className="label">
                <span className="label-text text-gray-700 font-medium">Update Status</span>
              </label>
              <select
                id="new-status"
                className="select select-bordered w-full bg-white text-gray-700 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
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
              <div className="mt-4">
                <button
                  onClick={handleUpdateStatus}
                  className="btn btn-primary btn-md w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Update Status
                </button>
              </div>
            </div>

            {user.RoleId !== 3 &&
              <div className="flex justify-between gap-4">
                <button
                  className="btn btn-error btn-md flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteComplaint}
                >
                  Delete Complaint
                </button>
                <button
                  className="btn btn-outline btn-md flex-1 border-indigo-300 text-indigo-600 hover:bg-indigo-100"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>

            }
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllComplaints;