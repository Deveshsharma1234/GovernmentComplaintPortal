import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
         <div className="min-h-screen h-full bg-gray-100 text-gray-800">
    {/* Hero Section */}
<div
  className="text-white min-h-screen flex items-center bg-purple-800 sm:bg-[url('https://consumerhelpline.gov.in/public/assets/home-banner.png')] bg-cover bg-center"
>
  <div className=" bg-opacity-80 w-full h-full flex items-center justify-end">
    <div className="w-full max-w-6xl px-4 sm:px-6 py-16">
      <div className="max-w-xl mx-auto sm:ml-auto sm:text-right justify-center ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10">
          Welcome to National Complaint Portal
        </h1>
        <p className="text-base sm:text-lg mb-6">
          A centralized platform to register and track your public grievances
        </p>
        <Link
          to="/registerComplaints"
          className="inline-block bg-yellow-400 text-blue-900 px-5 py-3 rounded-full font-semibold hover:bg-yellow-300 transition  "
        >
          Lodge a Complaint
        </Link>
      </div>
    </div>
  </div>
</div>






      {/* Services Section */}
  <div className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <Link to={"/registerComplaints"}>  <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">Lodge Complaint</h3>
          <p className="text-sm text-gray-600">Submit your grievance easily and securely through our guided form.</p>
        </div>
        </Link>  

       <Link to={"/getMyComplaints"} ><div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">Track Complaint</h3>
          <p className="text-sm text-gray-600">Check the status of your complaint and receive timely updates.</p>
        </div></Link>

       <Link to={"/about-us"}><div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">About the Portal</h3>
          <p className="text-sm text-gray-600">Learn about the mission of this portal and how we ensure transparency.</p>
        </div>
        </Link> 
      </div>

      {/* {How it works section} */}
      <section className="py-16 px-4 bg-blue-100 text-center">
      <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold">Step 1</h3>
          <p>Register your complaint on the portal.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Step 2</h3>
          <p>Track the progress of your complaint.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Step 3</h3>
          <p>Receive resolution updates and notifications.</p>
        </div>
      </div>
    </section>
    {/* Benifit section */}
     <section className="py-16 px-4 bg-gray-200 text-center">
      <h2 className="text-3xl font-semibold mb-6">Benefits</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-xs">
          <h3 className="text-xl font-semibold">Transparency</h3>
          <p>Track the status of your complaint in real-time.</p>
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl font-semibold">Efficiency</h3>
          <p>Resolve issues promptly through a streamlined process.</p>
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl font-semibold">User-Friendly</h3>
          <p>Easy to use interface for both tech-savvy and non-tech-savvy users.</p>
        </div>
      </div>
    </section>
     
   
  
    {/* Testimonial Sectoin */}
     <section className="py-16 px-4 bg-blue-100 text-center">
      <h2 className="text-3xl font-semibold mb-6">What Users Are Saying</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow-md">
          <p>"This portal is a great initiative. I got my issue resolved promptly."</p>
          <p>- User 1</p>
        </div>
        <div className="p-6 bg-white shadow-md">
          <p>"I am really happy with the support provided by the portal. It's easy to use!"</p>
          <p>- User 2</p>
        </div>
        <div className="p-6 bg-white shadow-md">
          <p>"Thanks to the team behind this portal. My complaint was handled efficiently."</p>
          <p>- User 3</p>
        </div>
      </div>
    </section>
    {/* Faq */}
     <section className="py-16 px-4 bg-gray-200 ">
      <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <details className="bg-white p-4 rounded-lg shadow-md">
          <summary className="font-semibold">How do I lodge a complaint?</summary>
          <p className="mt-2">You can lodge a complaint by clicking the "Lodge a Complaint" button on the homepage.</p>
        </details>
        <details className="bg-white p-4 rounded-lg shadow-md">
          <summary className="font-semibold">How long does it take to resolve a complaint?</summary>
          <p className="mt-2">Resolution time varies depending on the nature of the complaint. You will be updated regularly.</p>
        </details>
        <details className="bg-white p-4 rounded-lg shadow-md">
          <summary className="font-semibold">Can I track my complaint?</summary>
          <p className="mt-2">Yes, you can track the progress of your complaint in real-time through the portal.</p>
        </details>
      </div>
    </section>

   
      
    </div>
    );
}

export default Home;
