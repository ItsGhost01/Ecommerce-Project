export default function Footer() {
  return (
    <footer className="w-full bg-[#eeeffb] pt-16 mt-100 ">
      <div className="  container lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">

        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Hekto</h2>

          {/* Email */}
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="px-2 py-2 w-full text-sm outline-none bg-[#FFFFFF]"
            />
            <button className="bg-pink-500 text-white px-6 font-lato text-[16px] whitespace-nowrap rounded-sm">
              Sign Up
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">Contact Info</p>
          <p className="text-gray-400 text-sm mt-2 leading-6">
            Budanilkantha, Kathmandu 11, Nepal
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-5">Catagories</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Laptops & Computers</li>
            <li>Cameras & Photography</li>
            <li>Smart Phones & Tablets</li>
            <li>Video Games & Consoles</li>
            <li>Waterproof Headphones</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold mb-5">Customer Care</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>My Account</li>
            <li>Discount</li>
            <li>Returns</li>
            <li>Orders History</li>
            <li>Order Tracking</li>
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="font-semibold mb-5">Pages</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Blog</li>
            <li>Browse the Shop</li>
            <li>Category</li>
            <li>Pre-Built Pages</li>
            <li>Visual Composer Elements</li>
            <li>WooCommerce Pages</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-200 py-4 track bg-[#E7E4F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>©MonishShrestha - All Rights Reserved</p>

          {/* Social */}
          <div className="flex gap-3 mt-3 md:mt-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#3b5998] text-white text-xs">
              F
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#ab239b] text-white text-xs">
              I
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#000000] text-white text-xs">
              X
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}