const AdminWelcome = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="p-10 bg-base-200 shadow-xl rounded-xl max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">👈 Welcome 🎉</h1>
        <p className="text-base-content text-lg">
          Use the sidebar to navigate through the admin dashboard. <br />
          Manage <span className="font-semibold text-accent">Government Representative</span>, <span className="font-semibold text-accent">Government Employee</span>, <span className="font-semibold text-accent">Add/Remove  and Manage</span>All the  <span className="font-semibold text-accent">Users</span> efficiently.
        </p>
      </div>
    </div>
  );
};

export default AdminWelcome;
