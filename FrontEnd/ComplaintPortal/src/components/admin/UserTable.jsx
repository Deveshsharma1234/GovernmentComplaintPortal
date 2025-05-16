import { ROLE_MAP } from "../../utils/constants";
import { useSelector } from "react-redux";

const UserTable = ({props, onBlock}) => {
     const UserId = useSelector(store => store.user.user.UserId)

      const handleBlockClick = (userId) => {
      if (onBlock) {
          onBlock(userId);
      }
  };
    return (
      <div className="overflow-x-auto max-h-[800px]">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 sticky top-0 z-10">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>State</th>
            <th>District</th>
            <th>City</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.length > 0 ? (
            props.map((user) => (
              <tr key={user.UserId}>
                <td>{user.UserId}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Address}</td>
                <td>{user.Pincode}</td>
                <td>{user.State}</td>
                <td>{user.District}</td>
                <td>{user.City}</td>
                <td>{ROLE_MAP[user.RoleId]?.text || "Unknown"}</td>
                <td>{user.Phone}</td>
                <td>
                  {user.RoleId === 4 &&
                   UserId !== user.UserId && (
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleBlockClick(user.UserId)}
                      >
                        Block
                      </button>
                    )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
                <h4 className="text-lg font-semibold">No Data to Show</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
}

export default UserTable;
