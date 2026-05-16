import Sofa from "../assets/home/Sofa.png";
import Lamp from "../assets/home/Hanging lamp.png";
import Discount from "../assets/home/Discount.png";

export default function Home() {
  return (
    <section className="w-full bg-[#f2f0ff] overflow-hidden">
      <div className="  container   min-h-187.5 lg:px-12 flex items-center ">

        {/* LEFT */}
        <div className="flex-1 relative max-w-275">

          {/* Lamp */}
          <img
            src={Lamp}
            alt="lamp"
            className="hidden lg:block absolute -top-50 -left-32 w-65"
          />

          {/* Small text */}
          <p className="text-pink-500 font-semibold text-sm mb-3 ml-20">
            Best Furniture For Your Castle....
          </p>

          {/* Heading */}
          <h1 className="text-[30px] md:text-[53px] leading-tight font-bold  text-black font-josefins ml-20 ">
            New Furniture Collection Trends in 2020
          </h1>

          {/* Desc */}
          <p className="text-[#8A8FB9]mt-5 max-w-md text-[15px] leading-7 ml-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Magna in est adipiscing in phasellus non in justo.
          </p>

          {/* Button */}
          <button className="mt-7 bg-pink-500 hover:bg-pink-600 text-white px-7 py-3 rounded-md font-semibold shadow-md ml-20">
            Shop Now
          </button>

          {/* Dot */}
          <div className="w-3 h-3 bg-pink-500 rounded-full mt-16 ml-2"></div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 relative flex justify-center items-center">

          {/* Circle */}
          <div className="absolute w-137.5 h-137.5 bg-[#ECD2FA] rounded-full opacity-60"></div>

          {/* Sofa */}
          <img
            src={Sofa}
            alt="sofa"
            className="relative z-10 w-120 "
          />

          {/* Discount */}
          <img
            src={Discount}
            alt="discount"
            className="absolute top-3 right-5 z-20"
          />
        </div>
      </div>

      {/* Bottom dots */}
      <div className="flex justify-center gap-2 pb-6">
        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        <div className="w-3 h-3 border border-pink-500 rounded-full"></div>
        <div className="w-3 h-3 border border-pink-500 rounded-full"></div>
      </div>
    </section>
  );
}