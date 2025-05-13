import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import useSignInWithEmailAndPassword from "../hooks/useSignInWithEmailAndPassword"







const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const login = useSignInWithEmailAndPassword();

  const handleLogin = () => {

    login(emailRef, passwordRef, navigate);

  }










  return (
    <>
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

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
        <div className="relative w-full max-w-md">
          {/* Background gradient skew card */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          {/* Foreground glass form card */}
          <div className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl px-8 py-10 sm:p-12">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Login</h1>

            <form onSubmit={e => e.preventDefault()} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="peer w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 h-10"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  ref={passwordRef}
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="peer w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 h-10"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Password
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
                >
                  Sign In
                </button>
              </div>
            </form>
            <h3 className="text-black text-center text-sm sm:text-base">
              New? <Link to="/register" className="text-purple-500 hover:underline">Register here</Link>
            </h3>
          </div>

        </div>

      </div>
    </>
  );
};

export default Login;
