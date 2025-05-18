import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useComplaintStats from "../../hooks/admin/useComplaintStats";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import usecomplaintGraphData from "../../hooks/admin/usecomplaintGraphData";
import { FaListAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const statusIcons = {
  Pending: <FaHourglassHalf className="text-yellow-500 text-2xl" />,
  Resolved: <FaCheckCircle className="text-green-500 text-2xl" />,
  Rejected: <FaTimesCircle className="text-red-500 text-2xl" />,
};

const AdminDashboardOverview = () => {
  const [complaintStats, setComplaintStats] = useState();
  const [complainstGraphData, setComplaintGraphData] = useState([]);

  const getComplaintStats = useComplaintStats();
  const getComplaintGraphData = usecomplaintGraphData();

  useEffect(() => {
    const loadStats = async () => {
      const response = await getComplaintStats();
      if (response.status === 200) {
        setComplaintStats(response.data);
      } else {
        toast.error(response.message);
      }
    };

    const loadComplaintGraphData = async () => {
      const response = await getComplaintGraphData();
      if (response.status === 200) {
        setComplaintGraphData(response.data.status);
      } else {
        toast.error(response.message);
      }
    };

    loadStats();
    loadComplaintGraphData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-primary mb-6">
        📊 Dashboard Overview
      </h2>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg border border-primary">
          <div className="card-body text-center">
            <FaListAlt className="text-primary text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Total Complaints</h3>
            <p className="text-3xl font-bold text-primary">
              {complaintStats?.totalComplaints ?? "-"}
            </p>
          </div>
        </div>

        {complaintStats?.statuses.map((status, idx) => (
          <div key={idx} className="card bg-base-100 shadow-md">
            <div className="card-body text-center">
              {statusIcons[status.StatusName] || (
                <FaListAlt className="text-accent text-2xl mx-auto" />
              )}
              <h3 className="text-lg font-semibold mt-2">{status.StatusName}</h3>
              <p className="text-3xl font-bold text-warning">
                {status.ComplaintCount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          📂 Complaints by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complainstGraphData}>
            <XAxis dataKey="ComplaintType" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ComplaintCount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
