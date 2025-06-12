import React from 'react';
import { Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Import Autoplay plugin

const Home = () => {
  // Embla Carousel setup with loop and autoplay enabled
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })] // Autoplay with 3-second delay
  );

  // Expanded testimonials data with random user names and feedback
  const testimonials = [
    {
      feedback: "This portal is a great initiative. I got my issue resolved promptly. 🌟",
      user: "User 1",
    },
    {
      feedback: "I am really happy with the support provided by the portal. It's easy to use! 😊",
      user: "User 2",
    },
    {
      feedback: "Thanks to the team behind this portal. My complaint was handled efficiently. 🙌",
      user: "User 3",
    },
    {
      feedback: "The interface is so intuitive, and my issue was sorted out in no time! 🚀",
      user: "Alex M.",
    },
    {
      feedback: "I love how transparent the process is. Highly recommend this portal! 🌟",
      user: "Priya S.",
    },
    {
      feedback: "Amazing experience! The team was quick to respond and very helpful. 💯",
      user: "Rahul K.",
    },
  ];

  return (
    <div className="min-h-screen h-full bg-gray-100 text-gray-800 font-poppins">
      <style>
        {`
          .shadow-hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Default shadow */
          }

          .shadow-hover-card:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
          }

          .embla {
            overflow: hidden;
          }

          .embla__container {
            display: flex;
          }

          .embla__slide {
            flex: 0 0 33.333%; /* Show 3 slides at a time on larger screens */
            min-width: 0;
            padding: 0 1rem; /* Gap between slides */
          }

          @media (max-width: 768px) {
            .embla__slide {
              flex: 0 0 50%; /* Show 2 slides at a time on medium screens */
            }
          }

          @media (max-width: 480px) {
            .embla__slide {
              flex: 0 0 100%; /* Show 1 slide at a time on small screens */
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <div
        className="text-white min-h-screen flex items-center bg-purple-800 sm:bg-[url('https://consumerhelpline.gov.in/public/assets/home-banner.png')] bg-cover bg-center"
      >
        <div className="bg-opacity-80 w-full h-full flex items-center justify-end">
          <div className="w-full max-w-4xl px-3 sm:px-5 py-16">
            <div className="max-w-xl mx-auto sm:ml-auto sm:text-right justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-10">
                Welcome to National Complaint Portal
              </h1>
              <p className="text-base sm:text-lg mb-5 font-medium">
                A centralized platform to register and track your public grievances
              </p>
              <Link
                to="/registerComplaints"
                className="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                Lodge a Complaint
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
          Services 🛠️
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Link to={"/registerComplaints"}>
            <div className="shadow-hover-card bg-white rounded-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Lodge Complaint 📝</h3>
                <p className="text-sm text-gray-600 font-medium">
                  Submit your grievance easily and securely through our guided form.
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/getMyComplaints"}>
            <div className="shadow-hover-card bg-white rounded-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Track Your Complaints 📊</h3>
                <p className="text-sm text-gray-600 font-medium">
                  Check the status of your complaint and receive timely updates.
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/about-us"}>
            <div className="shadow-hover-card bg-white rounded-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">About the Portal ℹ️</h3>
                <p className="text-sm text-gray-600 font-medium">
                  Learn about the mission of this portal and how we ensure transparency.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-blue-100 text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
          How It Works 🔄
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Step 1 📝</h3>
            <p className="text-gray-600 font-medium">Register your complaint on the portal.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Step 2 🔍</h3>
            <p className="text-gray-600 font-medium">Track the progress of your complaint.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Step 3 ✅</h3>
            <p className="text-gray-600 font-medium">Receive resolution updates and notifications.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-200 text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Benefits 🎉
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800">Transparency 👀</h3>
            <p className="text-gray-600 font-medium">Track the status of your complaint in real-time.</p>
          </div>
          <div className="max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800">Efficiency ⚡</h3>
            <p className="text-gray-600 font-medium">Resolve issues promptly through a streamlined process.</p>
          </div>
          <div className="max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800">User-Friendly 😊</h3>
            <p className="text-gray-600 font-medium">Easy to use interface for both tech-savvy and non-tech-savvy users.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section with Embla Carousel */}
      <section className="py-16 px-4 bg-blue-100 text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          What Users Are Saying 💬
        </h2>
        <div className="embla max-w-5xl mx-auto" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((testimonial, index) => (
              <div className="embla__slide" key={index}>
                <div className="p-6 bg-white shadow-md rounded-lg h-full flex flex-col justify-between">
                  <p className="text-gray-600 font-medium">{testimonial.feedback}</p>
                  <p className="mt-2 text-gray-800 font-semibold">{testimonial.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with DaisyUI Accordion */}
      {/* Updated FAQ Section */}
<section className="py-16 px-4 faq-section bg-white text-black">
  <h2 className="faq-title mb-10 text-center text-3xl font-semibold">
    Frequently Asked Questions ❓
  </h2>

  <div className="max-w-3xl mx-auto space-y-4">
    <div className="join join-vertical w-full shadow-md rounded-lg">

      {/* FAQ 1 */}
      <div className="collapse collapse-arrow join-item border border-base-300 rounded-lg bg-white text-black">
        <input
          type="radio"
          name="faq-accordion"
          defaultChecked
        />
        <div className="collapse-title text-lg font-semibold hover:text-primary transition-colors">
          How do I lodge a complaint? 📝
        </div>
        <div className="collapse-content text-base text-gray-800">
          You can lodge a complaint by clicking the "Lodge a Complaint" button on the homepage and following the guided form.
        </div>
      </div>

      {/* FAQ 2 */}
      <div className="collapse collapse-arrow join-item border border-base-300 rounded-lg bg-white text-black">
        <input
          type="radio"
          name="faq-accordion"
        />
        <div className="collapse-title text-lg font-semibold hover:text-primary transition-colors">
          How long does it take to resolve a complaint? ⏳
        </div>
        <div className="collapse-content text-base text-gray-800">
          Resolution time varies depending on the nature of the complaint. You will be updated regularly on the progress.
        </div>
      </div>

      {/* FAQ 3 */}
      <div className="collapse collapse-arrow join-item border border-base-300 rounded-lg bg-white text-black">
        <input
          type="radio"
          name="faq-accordion"
        />
        <div className="collapse-title text-lg font-semibold hover:text-primary transition-colors">
          Can I track my complaint? 🔍
        </div>
        <div className="collapse-content text-base text-gray-800">
          Yes, you can track the progress of your complaint in real-time through the portal by visiting the "Track Your Complaints" section.
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
