import { useSelector } from 'react-redux';
import UserTable from './UserTable'
import { ROLE_MAP } from '../../utils/constants';
import { useEffect, useState } from 'react';

import { Link } from 'react-router';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const RoleId = useSelector(store => store.user.user.RoleId)
    const Role = useSelector(store => ROLE_MAP[RoleId]?.text)

    useEffect(() => {
        loadOnStartUp();
    }, []);

    const loadOnStartUp = async () => {
        // const userResult = await getAllUsers();
        // if (userResult.status === 200) {
        //     setUsers(userResult.data);
        //     setFilteredUsers(userResult.data);
        // }

    };
    const handleSelectChange = (event) => {
        const selectedRoleId = parseInt(event.target.value);
        if (selectedRoleId) {
            const filtered = users.filter(user => user.RoleId === selectedRoleId);
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    };

    const handleBlock = async (id) => {
        // const blockResult = await blockUser(id)
        // if (blockResult.status === 200) {
        //     toast.success("User has been blocked Permanently")
        //     loadOnStartUp()
        // }
    }

    return (
    <div className="p-4">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
    {/* Sidebar */}
  

    {/* Main Content */}
    <section className="col-span-4 space-y-6">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Active Users</h2>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Filter by Role</span>
          </label>
          <select
            id="role-filter"
            onChange={handleSelectChange}
            className="select select-bordered"
          >
            <option value="">All Roles</option>
            {Object.entries(ROLE_MAP).map(([roleId, role]) => (
              <option key={roleId} value={roleId}>
                {role.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-base-100 p-4 rounded-box shadow-md">
        <UserTable props={filteredUsers} onBlock={handleBlock} />
      </div>

      {/* Add New Salesperson */}
      {Role === "Admin" && (
        <div className="flex justify-end">
          <Link to="/registerSalesperson">
            <button className="btn btn-primary btn-outline w-52">
              Add New Employee or Representative
            </button>
          </Link>
        </div>
      )}
    </section>
  </div>
</div>

    );
}

export default Users;
