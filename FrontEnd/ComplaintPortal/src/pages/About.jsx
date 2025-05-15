import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-purple-900 text-white min-h-screen flex flex-col items-center justify-center py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
          About National Complaint Portal
        </h1>

        <p className="text-lg sm:text-xl mb-8 leading-relaxed text-center">
          The <strong>National Complaint Portal</strong> is an initiative by the Government of India to streamline the process of public grievance redressal. Citizens can lodge complaints, track their status, and receive timely responses from the relevant authorities — all through a unified digital platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="card bg-white text-purple-900 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center mb-4">Our Mission</h2>
              <p className="text-lg text-center mb-4">
                To provide a seamless, transparent, and accessible complaint management system that bridges the gap between citizens and government bodies.
              </p>
            </div>
          </div>

          <div className="card bg-white text-purple-900 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center mb-4">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Easy complaint registration process</li>
                <li>Real-time complaint tracking</li>
                <li>Notifications and updates via SMS/Email</li>
                <li>Secure and centralized grievance database</li>
                <li>Integration with National Consumer Helpline</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/registerComplaints"
            className="btn btn-primary text-white font-semibold hover:bg-yellow-500 transition duration-300 ease-in-out"
          >
            Lodge a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
