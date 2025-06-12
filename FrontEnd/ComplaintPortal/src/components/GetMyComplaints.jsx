import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import useComplaintStatusBadge from "../hooks/useComplaintStatusBadge";


const GetMyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const getStatusBadge = useComplaintStatusBadge();


  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(BASE_URL + "/myComplaints",{withCredentials: true}); 
        setComplaints(res.data.complaints);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };
    fetchComplaints();
  }, []);

  return (
   <div className="p-6 bg-gradient-to-br from-purple-100 to-white min-h-screen">
  <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">📋 My Complaints</h2>

  {complaints.length === 0 ? (
    <p className="text-gray-500 text-center">No complaints found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaints.map((complaint) => (
        <div
          key={complaint.ComplaintID}
          className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-purple-300 transition-shadow duration-300"
        >
          <p className="text-sm text-gray-500 mb-1">Complaint ID: #{complaint.ComplaintID}</p>
          <p className="text-base font-medium mb-2 text-gray-800">
            {complaint.Description}
          </p>
           <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span> {getStatusBadge(complaint.Status)}
          </p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Created By:</span> {complaint.CreatedBy}</p>
          <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Date:</span> {new Date(complaint.CreatedDate).toLocaleString()}</p>

          <div className="grid grid-cols-3 gap-2">
            {[complaint.Image1, complaint.Image2, complaint.Image3].map(
              (img, i) =>
                img && (
                  <img
                    key={i}
                    // src={`${BASE_URL}${img}`}
                    src={BASE_URL+`${img}`}
                    alt={`Complaint ${complaint.ComplaintID} img${i + 1}`}
                    className="w-full h-24 object-cover rounded-md border border-purple-200"
                  />
                )
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default GetMyComplaints;
