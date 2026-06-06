import axios from "axios";
import { useEffect, useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { Link,  useSearchParams } from "react-router";

import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCarts} from "../../redux/features/cartSlice";
import type { AppDispatch } from "../../redux/store";




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

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  images?: {
    path: string;
  }[];
}

interface Category {
  id: number;
  title: string;
  parentId?: number;
 subCategories?: Category[];
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
    const reduxUser = useSelector(
    (globalstore: RootState) => globalstore.user.value,
  );



const dispatch = useDispatch<AppDispatch>();

const addToCart = () => {
  if (!reduxUser) {
    toast.error("Login Required");
    return;
  }

  axios
    .post(
      "http://localhost:5000/api/cart/add",
      {
        productId: product.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       
      }
      
    )
    .then(() => {
      dispatch(fetchCarts())
      toast.success("Added to Cart Successfully");
  
    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
      toast.error("Failed to add cart");
    });
};

  return (

    <div className="flex bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition duration-300">
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

        <div className="flex items-center gap-2 mb-3 ">
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
            <button onClick={() => {
              addToCart(product.id);
            }} 
            type="button" 
            className="flex items-center gap-2 bg-pink-600 hover:bg-purple-600 text-white px-4 py-3 rounded-2xl">Add to Cart <ShoppingCart/></button>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
          {product.description}
        </p>
  
      </div>
          
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const [productLoading, setProductLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();

   console.log("product page", searchParams.get("q"));

  const [filters, setFilters] = useState({
    // limit: 10,
    // sort: "latest", // can be used be it is not URL related

    limit: searchParams.get("limit") || 10, 
    sort: searchParams.get("sort") || "latest",
    categoryIds: [],
  });

  useEffect(() => {
    const searchText = searchParams.get("q") || "" ;
    const limit = searchParams.get("limit") || 10 ;
    const sort = searchParams.get("sort") || "latest";

    const fetchInitialData = async () => {
      try {
        setProductLoading(true);
        setCategoryLoading(true);
        setError("");

        

        const [productsRes, categoryRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products?categoryIds=${filters.categoryIds.join()}&limit=${limit}&sort=${sort}&q=${searchText}`, {
            params: filters,
          }),

          axios.get("http://localhost:5000/api/category"),
        ]);

        setProducts(productsRes.data.data.products);
        setCategories(categoryRes.data.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch products and categories");
      } finally {
        setProductLoading(false);
        setCategoryLoading(false);
      }
    };

    fetchInitialData();
  }, [filters, searchParams]);


  const changeCategory = (e, cat) => {
    setFilters((prev) => {
      let newCategoryIds = [...prev.categoryIds]

      if(e.target.checked) {
        newCategoryIds.push(cat.id)
      }else{
        newCategoryIds = newCategoryIds.filter(el => el!=cat.id)
        }
      return {
        ...prev,
        categoryIds: newCategoryIds,
      };

 });
};

const changePerPage = (e) => {

  setFilters(prev => {
    return {...prev, limit: e.target.value }
  })
   setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("limit", e.target.value);
      return newParams;
    });
}

const changeSort = (e) => {

  setFilters(prev => {
    return {...prev, limit: e.target.value }
  })

   setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", e.target.value);
      return newParams;
    });
}
  
    const reduxUser = useSelector(
    (globalstore: RootState) => globalstore.user.value,
  );

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

      {/* Add Product Button */}
   {reduxUser?.isSeller && (
  <Link to="/seller/product/add">
    <button className="flex items-center gap-2 bg-pink-600 hover:bg-purple-600 text-white px-4 py-3 rounded-xl mt-4 transition">
      Product <Plus size={18} />
    </button>
  </Link>
)}

      <div className="flex gap-10 px-5 py-8">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          {/* Categories */}
          <div className="mb-7">
            <SectionTitle>Categories</SectionTitle>

            <div className="flex flex-col">
              {categories.map((cat) => (
                <div>
                  <div className={`flex items-center gap-2 ${cat.parentId ? "pl-8" : ""}`}>
                    <input 
                    id={`cat-${cat.id}`} 
                    type="checkbox" 
                    className="rounded" 
                    onChange= {(e) => {
                      changeCategory(e, cat);
                    }}/>
                  <label htmlFor={`cat-${cat.id}`}>{cat.title}</label>
                  </div>

                  {cat.subCategories?.map((sub) => (
                    <div className={`flex items-center gap-2 ${sub.parentId ? "pl-6" : ""}`}>
                      <input 
                      id={`cat-${sub.id}`} 
                      type="checkbox" 
                      className="rounded"
                      onChange= {(e) => {
                      changeCategory(e, sub);
                    }} />
                    <label htmlFor={`cat-${sub.id}`}>{sub.title}</label>
        
                  
                    </div>
                    
                  ))}
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                Per Page:
              </span>

              <select
                onChange={changePerPage}
                value={filters.limit}
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

              onChange = {changeSort}
              
                // onChange={(e) =>
                //   setFilters({
                //     ...filters,
                //     sort: e.target.value,
                //   })
                // }
                   value={filters.sort}
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
          {productLoading ? (
            <p className="text-gray-400">
              Loading products...
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    title: product.title,

                    image: product.images?.[0]?.path
                      ? `http://localhost:5000/${product.images[0].path.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "/placeholder.png",

                    price: product.price,
                    description: product.description,
                    rating: "★★★★★",
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}