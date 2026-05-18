import axios from "axios";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ChangeEvent, SyntheticEvent } from "react";
// import { useForm, SubmitHandler } from "react-hook-form"

const initialForm = {
  title: "",
  price: "",
  stock: "",
  description: "",
  categoryId: "",
};

type FormValues = {
  title: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
  images: FileList;
}

export default function Create() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // console.log("CATEGORY ID:", form.categoryId);

  // ✅ fixed infinite render
  useEffect(() => {
    axios.get("http://localhost:5000/api/Category").then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  console.log(categories);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const imageInput = e.currentTarget.elements.namedItem(
        "images",
      ) as HTMLInputElement;

      const images = imageInput?.files;

      if (!images || images.length === 0) {
        toast.error("Please select images");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());

      formData.append(
        "price",
        String(parseFloat(form.price || "0").toFixed(2)),
      );

      formData.append("stock", form.stock !== "" ? form.stock : "0");

      formData.append("description", form.description.trim());

      formData.append("categoryId", form.categoryId);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post(
        "http://localhost:5000/api/seller/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Product created successfully");
      setForm(initialForm);
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex  ml-9 w-96">
        <Link to="/products">
          <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition">
            Back
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="container flex items-center justify-center p-6 "
      >
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-200 ">
          {/* Header */}
          <div className="p-8 border-b">
            <h1 className="text-4xl font-bold text-gray-900">New product</h1>
            <p className="text-gray-500 mt-2">
              Fill in the details below to add a product to your catalogue.
            </p>

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={form.title}
                    placeholder="e.g. Wireless Headphones"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>

                  {categories.map((el: any) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>

                    <input
                      name="price"
                      type="number"
                      placeholder="0.00"
                      onChange={handleChange}
                      value={form.price}
                      className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Stock<span className="text-red-500">*</span>
                  </label>

                  <input
                    name="stock"
                    type="number"
                    onChange={handleChange}
                    value={form.stock}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Description */}
              <textarea
                name="description"
                placeholder="Describe your product..."
                onChange={handleChange}
                value={form.description}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              {/* File Upload */}
              <div className="border border-dashed border-gray-300 rounded-xl p-6">
                <p className="text-lg font-medium text-gray-700 mb-4 flex gap-3">
                  Choose Images to upload <Upload />
                </p>

                <input
                  type="file"
                  name="images"
                  multiple
                  className="block w-full text-sm text-gray-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setForm(initialForm)}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition"
                >
                  {loading ? "Creating…" : "Create product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
