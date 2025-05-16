import { useState } from 'react';

import useLocationData from '../../hooks/useLocationData';

import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import useRegisterAdminUser from '../../hooks/admin/useRegisterAdminUser';

const AdminRegister = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Address: '',
        Pincode: '',
        State: '',
        District: '',
        City: '',
        Password: '',
        RoleId: ''
    });
    const { states, districts, cities } = useLocationData(formData.State, formData.District);
    const registerAdminUser = useRegisterAdminUser();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "RoleId" ? parseInt(value, 10) : value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerAdminUser(formData);

            if (data?.message === "User Created Succesfull") {
                toast.success("Registration successful!");
                setTimeout(() => {
                    navigate("/login")

                }, 5000);

            } else {
                toast.error("Registration failed. " + (data?.message || "Unknown error."));
            }
        } catch (err) {
            console.error("Registration failed:", err);
            const errorMsg = err?.response?.data?.message || err.message || "Unknown error occurred.";
            toast.error("Registration failed. " + errorMsg);
        }
    };
    return (
        <div className="min-h-screen  flex   justify-center items-center bg-gray-100 py-10">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h1 className="text-2xl text-purple-600 font-semibold text-center mb-6">Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="FirstName">First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                required
                                className=" text-black w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="LastName">Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                                required
                                className=" text-black w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="RoleId">Role</label>
                            <select
                                name="RoleId"
                                value={formData.RoleId}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select Role</option>
                                <option value="2">Government Representative</option>
                                <option value="3">Government Employee</option>
                            </select>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Email">Email</label>
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Phone">Phone</label>
                            <input
                                type="text"
                                name="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Address">Address</label>
                            <input
                                type="text"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Pincode">Pincode</label>
                            <input
                                type="text"
                                name="Pincode"
                                value={formData.Pincode}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="State">State</label>
                            <select
                                name="State"
                                value={formData.State}
                                onChange={handleChange}
                                required
                                className="w-full text-black  mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.StateId} value={state.State}>{state.State}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="District">District</label>
                            <select
                                name="District"
                                value={formData.District}
                                onChange={handleChange}
                                required
                                disabled={!districts.length}
                                className="w-full text-black  mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select District</option>
                                {districts.map(district => (
                                    <option key={district.DistrictID} value={district.District}>{district.District}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="City">City</label>
                            <select
                                name="City"
                                value={formData.City}
                                onChange={handleChange}
                                required
                                disabled={!cities.length}
                                className="w-full  text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.CityID} value={city.City}>{city.City}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Password">Password</label>
                            <input
                                type="password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                required
                                className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none"
                        >
                            Register
                        </button>
                    </div>
                  
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
