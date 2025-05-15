import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile';

const Profile = () => {
    const user = useSelector(store => store.user.user);
    const [editProfileClicked, setEditProfileClicked] = useState(false)
    console.log(user);
    return (
     <div className="min-h-screen flex  items-center justify-center bg-gradient-to-br from-purple-900 to-gray-900 p-4 space-y-6 gap-30">
  {/* Profile Box */}
  <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">User Profile</h2>
    <div className="space-y-3 text-gray-800">
      <p><span className="font-semibold">Name:</span> {user.FirstName} {user.LastName}</p>
      <p><span className="font-semibold">Email:</span> {user.Email}</p>
      <p><span className="font-semibold">Phone:</span> {user.Phone}</p>
      <p><span className="font-semibold">Address:</span> {user.Address}, {user.City}, {user.District}</p>
      <p><span className="font-semibold">State:</span> {user.State} - {user.Pincode}</p>
      <p><span className="font-semibold">Role ID:</span> {user.RoleId}</p>
      <p><span className="font-semibold">Role</span> Citizen</p>
      <p>
        <span className="font-semibold">Account Status:</span>{' '}
        <span className={user.ActiveState === 1 ? "text-green-600" : "text-red-600"}>
          {user.ActiveState === 1 ? "Active" : "Inactive"}
        </span>
      </p>
    </div>
    <Link onClick={() => setEditProfileClicked(!editProfileClicked)}>
      <input type="button" className='btn justify-center mt-4 w-full' value={editProfileClicked ? "Cancel Editing Profile" : "Edit Profile"} />
    </Link>
  </div>

  {/* Edit Profile Box - Show only when editing */}
  {editProfileClicked && (
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6">
      <EditProfile setEditProfileClicked={setEditProfileClicked} />
    </div>
  )}
</div>

    );
}

export default Profile;
