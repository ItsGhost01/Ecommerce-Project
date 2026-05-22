import axios from "axios";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const priceRanges = [
  "$20.00 – $150.00",
  "$150.00 – $350.00",
  "$350.00 – $504.00",
  "$400.00 +",
];

const accentGold = "#C8A96E";

const serifFont = {
  fontFamily: "'Cormorant Garamond', serif",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-semibold text-gray-900 pb-1 mb-3 inline-block border-b-2"
      style={{
        ...serifFont,
        fontSize: "1.05rem",
        borderColor: accentGold,
      }}
    >
      {children}
    </span>
  );
}

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    description?: string;
    rating?: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <div
        className="shrink-0 overflow-hidden bg-gray-50"
        style={{ width: 190, height: 170 }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-6 py-5 flex-1">
        <h2
          className="font-semibold text-gray-900 mb-2"
          style={{
            ...serifFont,
            fontSize: "1.2rem",
          }}
        >
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mb-3">
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}

          <span className="text-red-600 font-medium text-sm">
            ${product.price}
          </span>

          <span
            className="text-xs tracking-widest"
            style={{ color: accentGold }}
          >
            {product.rating}
          </span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [filters, setFilters] = useState({
    limit: 10,
    sort: "latest",
    searchText: "",
  });

  const fetchProducts() = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products",
        {
          params: filters,
        }
      );

      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [filters]);

  return (
    <div className="min-h-screen container mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 py-4">
        <h1
          className="font-semibold text-gray-900 tracking-wide"
          style={{
            ...serifFont,
            fontSize: "1.4rem",
          }}
        >
          Ecommerce Accessories & Fashion Item
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          About {products.length} results
        </p>
      </div>

      {/* Seller Button */}
      <Link to="/seller/product/add">
        <button className="flex items-center gap-2 bg-pink-600 hover:bg-purple-600 text-white px-4 py-3 rounded-xl mt-4 transition">
          Product <Plus size={18} />
        </button>
      </Link>

      <div className="flex gap-10 px-5 py-8">
        {/* Sidebar */}
        <aside className="w-[170px] shrink-0">
          {/* Categories */}
          <div className="mb-8">
            <SectionTitle>Categories</SectionTitle>

            <div className="flex flex-col mt-2">
              <label className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === ""}
                  onChange={() => setSelectedCategory("")}
                />
                All Products
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === "electronics"}
                  onChange={() => setSelectedCategory("electronics")}
                />
                Electronics
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === "fashion"}
                  onChange={() => setSelectedCategory("fashion")}
                />
                Fashion
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === "accessories"}
                  onChange={() => setSelectedCategory("accessories")}
                />
                Accessories
              </label>
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <SectionTitle>Price Filter</SectionTitle>

            <div className="flex flex-col mt-2">
              {priceRanges.map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={selectedPrice === range}
                    onChange={() => setSelectedPrice(range)}
                  />

                  {range}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                Per Page:
              </span>

              <select
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    limit: Number(e.target.value),
                  })
                }
                className="text-xs border border-gray-200 px-2 py-1 rounded-sm"
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>

              <span className="text-xs text-gray-400 ml-2">
                Sort By:
              </span>

              <select
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sort: e.target.value,
                  })
                }
                className="text-xs border border-gray-200 px-2 py-1 rounded-sm"
              >
                <option value="latest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-5">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  image: `http://localhost:5000/${product.images[0]?.path.replace(
                    /\\/g,
                    "/"
                  )}`,
                  price: product.price,
                  description: product.description,
                  rating: "★★★★★",
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>



//fixing issues in product 
  );
}