import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const products = [
  {
    id: 1,
    title: "Dictum morbi",
    oldPrice: "$106.00",
    newPrice: "$111.00",
    stars: "★★★★☆",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
  {
    id: 2,
    title: "Sodales sit",
    oldPrice: "$106.00",
    newPrice: "$115.00",
    stars: "★★★★★",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
  {
    id: 3,
    title: "Nibh varius",
    oldPrice: "$116.00",
    newPrice: "$159.00",
    stars: "★★★★★",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
  {
    id: 4,
    title: "Mauris quis",
    oldPrice: "$96.00",
    newPrice: "$105.00",
    stars: "★★★★☆",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
  {
    id: 5,
    title: "Morbi sagittis",
    oldPrice: "$136.00",
    newPrice: "$125.00",
    stars: "★★★★★",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
  {
    id: 6,
    title: "Ultrices venenatis",
    oldPrice: "$156.00",
    newPrice: "$138.00",
    stars: "★★★★☆",
    img: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna is est adipiscing in phasellus non in justo.",
  },
];

const categories = [
  "Prestashop",
  "Magento",
  "Bigcommerce",
  "osCommerce",
  "Jotun",
];
const subCategories = ["Accessories", "Jewellery", "Watches"];
const priceRanges = [
  "$20.00 – $150.00",
  "$150.00 – $350.00",
  "$350.00 – $504.00",
  "$400.00 +",
];

const accentGold = "#C8A96E";
const serifFont = { fontFamily: "'Cormorant Garamond', serif" };

function SectionTitle({ children }) {
  return (
    <span
      className="font-semibold text-gray-900 pb-1 mb-3 inline-block border-b-2"
      style={{ ...serifFont, fontSize: "1.05rem", borderColor: accentGold }}
    >
      {children}
    </span>
  );
}

function CheckboxItem({ label, defaultChecked = false, indent = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label
      className={`flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer hover:text-gray-800 ${indent ? "pl-5" : ""}`}
    >
      <input
        type="checkbox"
        className="rounded"
        checked={checked}
        onChange={() => setChecked(!checked)}
        style={{ accentColor: accentGold }}
      />
      {label}
    </label>
  );
}

function ProductCard({ product }) {
  return (
    <div className="flex bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div
        className="shrink-0 overflow-hidden bg-gray-50"
        style={{ width: 192, height: 168 }}
      >
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={product.img}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-5 flex-1">
        <h3
          className="font-semibold tracking-wide text-gray-900 mb-1"
          style={{ ...serifFont, fontSize: "1.18rem" }}
        >
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400 line-through">
            {product.oldPrice}
          </span>
          <span className="text-sm font-medium text-red-600">
            {product.newPrice}
          </span>
          <span
            className="text-xs tracking-widest"
            style={{ color: accentGold }}
          >
            {product.stars}
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-3 max-w-md">
          {product.desc}
        </p>
        <div className="flex gap-2">
          {["🛒", "♡", "⊕"].map((icon) => (
            <button
              key={icon}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 text-xs cursor-pointer bg-transparent hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const reduxUser = useSelector(
    (globalStore: RootState) => globalStore.user.value,
  );

  return (
    <div className="min-h-screen container">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <h1
          className="font-semibold tracking-wide text-gray-900 font-lato"
          style={{ ...serifFont, fontSize: "1.4rem" }}
        >
          Ecommerce Accessories &amp; Fashion Item
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          About 14,521 results (0.62 seconds)
        </p>
      </div>
      {reduxUser?.isSeller && (
        <Link to="/Create">
          <button className="flex border p-3 bg-[#fc03ca] text-white rounded-xl gap-2 mt-2 cursor-pointer hover:bg-purple-600">
            Product <Plus />
          </button>
        </Link>
      )}

      {/* Layout */}
      <div className=" flex gap-9 px-5 py-8">
        {/* Sidebar */}
        <aside className="shrink-0" style={{ width: 168 }}>
          {/* Categories */}
          <div className="mb-7">
            <SectionTitle>Categories</SectionTitle>
            <div className="flex flex-col mt-1">
              {categories.map((cat) => (
                <CheckboxItem key={cat} label={cat} />
              ))}
              <CheckboxItem label="Bags" />
              {subCategories.map((cat) => (
                <CheckboxItem key={cat} label={cat} indent />
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <SectionTitle>Price Filter</SectionTitle>
            <div className="flex flex-col mt-1">
              {priceRanges.map((range) => (
                <CheckboxItem
                  key={range}
                  label={range}
                  defaultChecked={range === "$350.00 – $504.00"}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Per Page:</span>
              <select className="text-xs border border-gray-200 bg-white text-gray-800 px-2 py-1 rounded-sm outline-none cursor-pointer">
                <option>12</option>
                <option>24</option>
                <option>48</option>
              </select>
              <span className="text-xs text-gray-400 ml-2">Sort By:</span>
              <select className="text-xs border border-gray-200 bg-white text-gray-800 px-2 py-1 rounded-sm outline-none cursor-pointer">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">View:</span>
              <button className="text-xs border border-gray-800 bg-gray-800 text-white px-2.5 py-1 rounded-sm cursor-pointer">
                &#9776;
              </button>
              <button className="text-xs border border-gray-200 bg-transparent text-gray-400 px-2.5 py-1 rounded-sm cursor-pointer hover:bg-gray-800 hover:text-white hover:border-gray-800">
                &#9783;
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
