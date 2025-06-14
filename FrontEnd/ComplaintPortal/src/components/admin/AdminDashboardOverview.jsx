import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
  const [filteredGraphData, setFilteredGraphData] = useState([]); // New state for filtered data

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
        const data = response.data.status;
        setComplaintGraphData(data);
        // Filter out categories with 0 complaints
        const filteredData = data.filter(item => item.ComplaintCount > 0);
        setFilteredGraphData(filteredData);
      } else {
        toast.error(response.message);
      }
    };

    loadStats();
    loadComplaintGraphData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-indigo-900 dark:text-indigo-200 mb-6">
        📊 Dashboard Overview
      </h2>


      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-lg border border-indigo-200">
          <div className="card-body text-center">
            <FaListAlt className="text-indigo-600 text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2 text-gray-700">Total Complaints</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {complaintStats?.totalComplaints ?? "-"}
            </p>
          </div>
        </div>

        {complaintStats?.statuses.map((status, idx) => (
          <div key={idx} className="card bg-white shadow-md border border-gray-100">
            <div className="card-body text-center">
              {statusIcons[status.StatusName] || (
                <FaListAlt className="text-teal-500 text-2xl mx-auto" />
              )}
              <h3 className="text-lg font-semibold mt-2 text-gray-700">{status.StatusName}</h3>
              <p className="text-3xl font-bold text-yellow-500">
                {status.ComplaintCount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-900">
          📂 Complaints by Category
        </h3>
        {filteredGraphData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No complaints to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredGraphData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="ComplaintType"
                tick={{ fill: '#4b5563', fontSize: 14 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                interval={0}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                tick={{ fill: '#4b5563', fontSize: 14 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  color: '#1f2937'
                }}
              />
              <Bar
                dataKey="ComplaintCount"
                fill="#6366f1" // Indigo-600
                radius={[8, 8, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardOverview;