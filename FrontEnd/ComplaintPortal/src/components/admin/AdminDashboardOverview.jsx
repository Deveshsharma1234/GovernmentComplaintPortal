import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const complaintStats = [
  { name: "Road", complaints: 30 },
  { name: "Water", complaints: 45 },
  { name: "Electricity", complaints: 20 },
  { name: "Garbage", complaints: 50 },
];

const AdminDashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">📊 Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Total Complaints</div>
          <div className="stat-value text-primary">145</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">60</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">70</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Escalated</div>
          <div className="stat-value text-error">15</div>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-base-200 p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Complaints by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complaintStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="complaints" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
