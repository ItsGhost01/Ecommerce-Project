// import axios from "axios";
// import { useEffect, useState } from "react"



// export default function Cart() {

// const [carts, setCarts] = useState([]);

//   useEffect(() => {
//   axios.get("http://localhost:5000/api/cart", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//   .then((res) => {
//     setCarts(res.data.data ?? []);
 
//   })
//   .catch((error) => {
//     console.error("Error fetching carts:", error);
//   });
// }, []);

//   return (


  




//     <div className="max-w-4xl mx-auto p-6">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//       {/* Empty state box */}
//       <div className="border rounded-xl p-10 text-center shadow-sm">
//         <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
//         <p className="text-gray-500 mb-6">
//           Looks like you haven’t added anything yet.
//         </p>

//         <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition">
//           Continue Shopping
//         </button>
//       </div>
//     </div>

  
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCarts } from "../redux/features/cartSlice";


import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";

import AddtoCart from "../assets/AddtoCart.svg";




interface ProductImage {
  id: number;
  path: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  stock: number;
  images: ProductImage[];
}

interface CartItem {
  id: number;
  quantity: number;
  productId: number;
  products: Product; // ✅ FIXED (was product)
}

function Cart() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

    // const dispatch = useDispatch(); 
  // const [payment, setPayment] = useState<"cash" | "esewa">("cash");



  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarts(res.data?.data.cartData || []); // ✅ FIXED safe access
  
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
        setCarts([]);
      })
      .finally(() => setLoading(false));
  }, []);


  const dispatch = useDispatch<AppDispatch>();


const removeItem = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setCarts((prev) => prev.filter((item) => item.id !== id));

    // 🔥 sync redux header
    dispatch(fetchCarts());

    toast.success("Item removed from cart");
  } catch (error: any) {
    console.log(error.response?.data || error.message);
    toast.error("Failed to remove item");
  }
};

  const clearItem = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/clear`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    // empty state
   setCarts([]);
   dispatch(fetchCarts());

    toast.success("Cart cleared successfully");
  } catch (error: any) {
    console.log(error.response?.data || error.message);
    toast.error("Failed to clear cart");
  }
};
  
  const updateQty = (productId: number, quantity:number, id: number, value: number) => {

    console.log({value})
    console.log({id})
     axios
    .post(
      "http://localhost:5000/api/cart/add",
      {
        productId: productId,
        quantity: quantity + value
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    setCarts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };

const subtotal = carts.reduce(
  (sum, item) => {
    const price = parseFloat(item.products?.price || "0");
    return sum + price * item.quantity;
  },
  0
);

  const getImageUrl = (item: CartItem) => {
    const img = item.products.images?.[0]?.path;
    if (!img) return "";
    return `http://localhost:5000/${img.replace(/\\/g, "/")}`;
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !city || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Order placed");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-6 py-10 text-[#1a1f36]">
      <div className="mx-auto max-w-[1200px]">

        <h1 className="text-2xl font-bold text-[#1a2e6f] mb-8 tracking-tight">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Left: Product Table ── */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-[#eceef5] text-[11px] font-semibold text-[#8892b0] uppercase tracking-widest">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Total</span>
            </div>

            {/* Rows */}
            {loading ? (
              <div className="py-16 text-center text-[#8892b0] text-sm">
                Loading your cart…
              </div>
            ) : carts.length === 0 ? (
              <div className="py-16 text-center text-[#b0b8d0] text-sm">
                <svg> 
                    <img src={AddtoCart} alt="cart" className="mx-auto mb-3 w-12 h-12" />

                </svg>
                🛒 Your cart is empty.
              </div>
            ) : (
              carts.map((item) => {
                const imgUrl = getImageUrl(item);
                const lineTotal =
                  parseFloat(item.products.price) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-6 py-5 border-b border-[#eceef5] last:border-b-0 hover:bg-[#fafbff] transition-colors"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4 relative">
                      <button
                        title="Remove"
                        onClick={()=> {
                          {removeItem(item.id)}
                        }}
                        className="absolute -top-1 -left-2 w-5 h-5 rounded-full bg-[#1a2e6f] text-white text-[10px] flex items-center justify-center hover:bg-[#ff2d6b] transition-colors cursor-pointer z-10"
                      >
                        ✕
                      </button>

                      <div className="w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-[#eceef5]">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={item.products.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl text-[#c0c8e0]">
                            🛍️
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#1a1f36] leading-snug mb-0.5">
                          {item.products.title}
                        </p>
                        <p className="text-xs text-[#8892b0] line-clamp-2 leading-relaxed">
                          {item.products.description}
                        </p>
                        <p className="text-[11px] text-[#b0b8d0] mt-0.5">
                          {item.products.stock} in stock
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center text-sm font-semibold text-[#1a1f36]">
                      ${parseFloat(item.products.price).toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex justify-center">
                      <div className="flex items-center border border-[#dde1f0] rounded-lg overflow-hidden bg-[#f8f9fc]">
                        <button
                          onClick={() => updateQty(item.productId , item.quantity, item.id,  -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#5a6488] hover:bg-[#eceef5] hover:text-[#1a2e6f] transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm font-semibold text-[#1a1f36]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity, item.id, + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#5a6488] hover:bg-[#eceef5] hover:text-[#1a2e6f] transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-center text-sm font-bold text-[#1a1f36]">
                      ${lineTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })
            )}

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between px-6 py-5 border-t border-[#eceef5] bg-[#fafbff]">
              <button className="bg-[#ff2d6b] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-px transition-all cursor-pointer">
                Update Cart
              </button>

              <button
                onClick={() => clearItem()}
                className="bg-[#ff2d6b] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-px transition-all cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Right: Order Panel ── */}
          <div className="bg-[#eef0f8] rounded-2xl p-7 flex flex-col gap-0">

            <h2 className="text-[17px] font-bold text-[#1a2e6f] text-center mb-5 tracking-wide">
              Order Summary
            </h2>

            <div className="flex justify-between items-center py-3 border-b border-[#d8dced] text-sm">
              <span className="text-[#5a6488] font-medium">Subtotal</span>
              <span className="font-bold text-[#1a1f36]">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 text-sm">
              <span className="text-[#5a6488] font-medium">Total</span>
              <span className="font-bold text-[#1a2e6f] text-base">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <hr className="border-[#d8dced] my-5" />

            <h2 className="text-[17px] font-bold text-[#1a2e6f] text-center mb-5 tracking-wide">
              Delivery Details
            </h2>

            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", value: name, set: setName, required: true },
                { label: "Phone Number", value: phone, set: setPhone, required: true },
                { label: "City / District", value: city, set: setCity, required: true },
                { label: "Order Note", value: note, set: setNote, required: false },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-[10px] font-semibold text-[#7b82a8] uppercase mb-1">
                    {field.label}
                  </p>
                  <input
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="w-full border-b border-[#c8cce0] bg-transparent text-sm outline-none"
                  />
                </div>
              ))}

              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-5 bg-green-500 text-white font-bold py-4 rounded-xl"
            >
              Place Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;