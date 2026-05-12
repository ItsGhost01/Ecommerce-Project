import { Link } from "react-router";
import Aboutus from "../assets/about us.png";
import { CircleStar, Headset, Truck } from "lucide-react";


export default function About() {
  return (
    <div className="bg-[#f6f5ff] text-[#0d0e43] min-h-screen">

      {/* Hero Section */}
      <section className="bg-[#7e33e0] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-josefin">
          About Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-white/90">
          Your trusted destination for modern, affordable, and stylish shopping
          experiences.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#0d0e43]">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hekto Ecommerce is a modern online shopping platform dedicated to
            bringing high-quality products at unbeatable prices. We focus on
            delivering a smooth, fast, and enjoyable shopping experience for
            every customer.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            From fashion to electronics, home essentials to lifestyle products,
            we carefully curate everything to match your needs and style.
          </p>

          <Link to ="/Products">
          <button className="bg-[#fb2e86] hover:bg-pink-600 text-white px-6 py-3 rounded-md transition">
            Explore Products
          </button>
          </Link>
        </div>

        {/* Image / Illustration */}
        
            <p className="text-[#7e33e0] font-semibold w-full">
                <img src={Aboutus} alt="Illustration" />
            </p>
          
      </section>

     {/* Features Section */}
<section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

    {/* Fast Delivery */}
    <div className="p-6 border rounded-lg hover:shadow-md transition flex flex-col items-center gap-3">
      <Truck className="text-[#7e33e0] w-10 h-10" />

      <h3 className="text-xl font-semibold text-[#7e33e0]">
        Fast Delivery
      </h3>

      <p className="text-gray-600">
        Quick and reliable shipping to your doorstep.
      </p>
    </div>

    {/* Best Quality */}
    <div className="p-6 border rounded-lg hover:shadow-md transition flex flex-col items-center gap-3">
      <CircleStar className="text-[#fb2e86] w-10 h-10" />

      <h3 className="text-xl font-semibold text-[#fb2e86]">
        Best Quality
      </h3>

      <p className="text-gray-600">
        Carefully selected products for premium quality.
      </p>
    </div>

    {/* 24/7 Support */}
    <div className="p-6 border rounded-lg hover:shadow-md transition flex flex-col items-center gap-3">
      <Headset className="text-[#0d0e43] w-10 h-10" />

      <h3 className="text-xl font-semibold text-[#0d0e43]">
        24/7 Support
      </h3>

      <p className="text-gray-600">
        We are always here to help you anytime.
      </p>
    </div>

  </div>
</section>

      {/* Footer CTA */}
      <section className="bg-[#7e33e0] text-white py-14 text-center px-6">
        <h2 className="text-3xl font-bold mb-3">
          Start Your Shopping Journey Today
        </h2>
        <p className="mb-6 text-white/90">
          Discover thousands of products tailored for you.
        </p>
        <button className="bg-[#fb2e86] px-6 py-3 rounded-md font-medium hover:scale-105 transition">
          Shop Now
        </button>
      </section>

    </div>
  )
}
