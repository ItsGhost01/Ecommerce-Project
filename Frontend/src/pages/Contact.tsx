
import ContactUs from "../assets/Contactus.png";

export default function Contact() {
    
  return (
    <>
      <div className="bg-[#f6f5ff] text-[#0d0e43] min-h-screen">

        {/* Hero Section */}
        <section className="bg-[#7e33e0] text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-josefin">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/90">
            We would love to hear from you. Send us your message anytime.
          </p>
        </section>

        {/* Contact Content */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left */}
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Information About us
              </h2>

              <p className="text-gray-500 leading-8 mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mattis neque ultrices mattis aliquam, malesuada diam est.
                Malesuada sem tristique amet erat vitae eget dolor lobortis.
                Accumsan faucibus vitae lobortis quis bibendum quam.
              </p>

              {/* Dots */}
              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-purple-700"></div>
                <div className="w-5 h-5 rounded-full bg-pink-500"></div>
                <div className="w-5 h-5 rounded-full bg-cyan-400"></div>
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-4xl font-bold mb-10">
                Contact Way
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-700"></div>

                  <div>
                    <p className="text-gray-500 font-semibold">
                      Tel: 877-67-88-99
                    </p>

                    <p className="text-gray-500">
                      E-Mail: shop@store.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500"></div>

                  <div>
                    <p className="text-gray-500 font-semibold">
                      Support Forum
                    </p>

                    <p className="text-gray-500">
                      For over 24hr
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-400"></div>

                  <div>
                    <p className="text-gray-500 font-semibold">
                      20 Margaret st, London
                    </p>

                    <p className="text-gray-500">
                      Great britain, 3NM98-LK
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-400"></div>

                  <div>
                    <p className="text-gray-500 font-semibold">
                      Free standard shipping
                    </p>

                    <p className="text-gray-500">
                      on all orders.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">

            {/* Form */}
            <div>
              <h2 className="text-5xl font-bold mb-6">
                Get In Touch
              </h2>

              <p className="text-gray-500 leading-8 mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mattis neque ultrices tristique amet erat vitae eget dolor.
              </p>

              <form className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="border border-gray-300 px-4 py-4 rounded outline-none focus:border-[#7e33e0]"
                  />

                  <input
                    type="email"
                    placeholder="Your E-mail"
                    className="border border-gray-300 px-4 py-4 rounded outline-none focus:border-[#7e33e0]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject*"
                  className="w-full border border-gray-300 px-4 py-4 rounded outline-none focus:border-[#7e33e0]"
                />
              

                <textarea
                  rows="7"
                  placeholder="Type Your Message*"
                  className="w-full border border-gray-300 px-4 py-4 rounded outline-none resize-none focus:border-[#7e33e0]"
                ></textarea>

                <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-3 rounded transition">
                  Send Mail
                </button>

              </form>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={ContactUs}
                alt="contact"
                className="w-full max-w-xl"
              />
            </div>

          </div>

        </section>

      </div>
    </>
  );
}