import axios from "axios";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
  images: FileList;
};

export default function Create() { 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // console.log("CATEGORY ID:", form.categoryId);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Category").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  console.log(categories);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("form submitted", data);

    if (!data.images || data.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title.trim());
      formData.append("price", data.price.toFixed(2));
      formData.append("stock", String(data.stock || 0));
      formData.append("description", data.description.trim());
      formData.append("categoryId", String(data.categoryId));

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
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

      reset();
      toast.success("Product created successfully");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "failed to create product");
    } finally {
      setLoading(false);
    }
  };

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
        onSubmit={handleSubmit(onSubmit)}
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
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="e.g. Wireless Headphones"
                    className={`w-full border rounded-xl px-4 py-3 outline-none ${errors.title ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      Title is required
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("categoryId", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={`w-full border rounded-xl px-4 py-3 outline-none
                    ${errors.categoryId ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="">Select Category</option>

                  {categories.map((el: any) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">Select a category</p>
                )}
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-5 -translate-y-1/2 text-gray-400">
                      $
                    </span>

                    <input
                      {...register("price", {
                        valueAsNumber: true,
                        required: true,
                      })}
                      type="number"
                      placeholder="0.00"
                      className={`w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2 outline-none ${errors.price ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-purple-500`}
                    />

                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        Price is Required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Stock<span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("stock", {
                      valueAsNumber: true,
                      required: true,
                    })}
                    type="number"
                    className={`w-full border border-gray-300 rounded-xl px-4 py-2 outline-none ${errors.price ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">
                      Stock is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <textarea
                {...register("description")}
                placeholder="Describe your product..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              {/* File Upload */}
              <div className="border border-dashed border-gray-300 rounded-xl p-6">
                <p className="text-lg font-medium text-gray-700 mb-4 flex gap-3">
                  Choose Images to upload <Upload />
                </p>

                <input
                  type="file"
                  {...register("images", { required: true })}
                  multiple
                  className="block w-full text-sm text-gray-500"
                />
                {errors.images && (
                  <p className="text-red-500 mt-1 text-sm">
                    Upload At Least A Image
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                  }}
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
      <DevTool control={control} />
    </>
  );
}
