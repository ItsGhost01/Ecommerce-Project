import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

interface SubCategory {
  id: number;
  title: string;
  parentId: number;
}

interface Category {
  id: number;
  title: string;
  parentId: number | null;
  subCategories?: SubCategory[];
}

interface CategoryFormData {
  title: string;
  parentId: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>();

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(res.data.data);
    } catch (error) {
      console.log("Fetch Categories Error:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (data: CategoryFormData) => {
    try {
      await axios.post(
        "http://localhost:5000/api/category/add",
        {
          title: data.title,
          parentId: data.parentId ? Number(data.parentId) : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Category created successfully");
      fetchCategories();
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500">
              Category Management
            </h1>
            <p className="text-white-500 mt-1">
              Create and manage categories and subcategories
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-yellow-500 text-white px-5 py-3 rounded-2xl font-semibold">
            Total Categories {categories.length}
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Form Section */}
          <div className="w-100 h-100">
            <div className="rounded-3xl border bg-white border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Create Category
              </h2>

              <form
                onSubmit={handleSubmit(createCategory)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>

                  <input
                    {...register("title", {
                      required: "Category title is required",
                    })}
                    placeholder="Enter category name"
                    className="w-full text-black px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition"
                  />

                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>

                  <select
                    {...register("parentId")}
                    className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition"
                  >
                    <option value="">Main Category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>
          </div>

          {/* Categories Section */}
          <div className="h-auto w-200">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Existing Categories
                </h2>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                  {categories.length} Total
                </span>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📂</div>

                  <h3 className="text-lg font-semibold text-gray-700">
                    No Categories Found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Create your first category to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="border border-gray-200 rounded-2xl p-5 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
                    >
                      {/* CATEGORY HEADER */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {category.title}
                        </h3>

                        <div className="flex items-center gap-3">
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {category.subCategories?.length || 0} Subcategories
                          </span>

                          {/* CATEGORY DELETE BUTTON */}
                          <button className="text-red-500 text-sm font-semibold hover:text-red-700 cursor-pointer">
                           <Trash className="w-4 h-4"/>
                          </button>
                        </div>
                      </div>

                      {/* SUBCATEGORIES */}
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <div className="mt-4 ml-2 space-y-2">
                            {category.subCategories.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between text-gray-600"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <span>{sub.title}</span>
                                </div>

                                {/* SUBCATEGORY DELETE BUTTON */}
                                <button className="text-red-400 text-sm hover:text-red-600">
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;