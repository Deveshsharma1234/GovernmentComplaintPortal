// src/hooks/useComplaintStatusBadge.js


const useComplaintStatusBadge = () => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
      case 2:
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Progress</span>;
      case 3:
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>;
      case 4:
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  return getStatusBadge;
};

export default useComplaintStatusBadge;
