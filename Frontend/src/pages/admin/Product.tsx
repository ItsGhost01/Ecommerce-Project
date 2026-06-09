import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  user: {
    firstName: string;
    lastName: string;
  };
  images?: {
    path: string;
  }[];
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductLoading(true);

        const res = await axios.get("http://localhost:5000/api/products?limit=1000");

        setProducts(res.data.data.products);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch products");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProducts();
  }, []);

const deleteProduct = async (id: number) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/admin/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      toast.success("Product deleted successfully");
    }
  } catch (err: any) {
    console.log(err?.response?.data || err);
    toast.error(err?.response?.data?.message || "Failed to delete product");
  }
};

  if (productLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Products</h1>

          <span className="bg-white px-4 py-2 rounded-lg border text-sm text-gray-600">
            {products.length} Products
          </span>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    product.images?.[0]?.path
                      ? `http://localhost:5000/${product.images[0].path.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "/placeholder.png"
                  }
                  alt={product.title}
                  className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                />

                <button
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setShowDeleteModal(true);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-purple-600 font-bold text-xl mt-2">
                  Rs. {product.price}
                </p>

                <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                  {product.description}
                </p>
                <p className="text-black mt-3"> <span className="text-yellow-500 font-bold">Added by Seller:</span> {product.user?.firstName} {product.user?.lastName} </p> 
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!productLoading && products.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl text-gray-500">No products found</h2>
          </div>
        )}
      </div>

      {/* DELETE MODAL (OUTSIDE MAP) */}
      {showDeleteModal && selectedProductId !== null && (
        <div className="fixed inset-0 backdrop-brightness-95 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-amber-500">
              Are you sure you want to delete?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProductId(null);
                }}
                className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 cursor-pointer"
              >
                No
              </button>

              <button
                onClick={async () => {
                  if (selectedProductId !== null) {
                    await deleteProduct(selectedProductId);
                  }
                  setShowDeleteModal(false);
                  setSelectedProductId(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}