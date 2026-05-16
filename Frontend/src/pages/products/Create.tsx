import axios from "axios";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";


export default function Create() {
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
      axios.get("http://localhost:5000/api/Category").then((res)=> {
        setCategories(res.data.data);
      })

    })

  return (

  
    <>
 
        <div className="flex  ml-9 w-96">
      <Link to="/products">
     <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition">
             Back
            </button>
        </Link>
        </div>

 <form className="container flex items-center justify-center p-6 " action="">
  
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-200 ">



        
        {/* Header */}
        <div className="p-8 border-b">
          <h1 className="text-4xl font-bold text-gray-900">
            New product
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details below to add a product to your catalogue.
          </p>


       

        {/* Form */}
        <div className="p-8 space-y-6">

          {/* Success Message
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
            Product created successfully.
          </div> */}

          {/* Title */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
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

            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500">
             
             {

              categories.map(el => {
              
                return <option>{el.title}</option>
              })
             }
            
            </select>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Price */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Price (USD) <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>

                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-800 font-medium">
                  Stock
                </label>

              </div>

              <input
                type="number"
                defaultValue={0}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-800 font-medium">
                Description
              </label>

          
            </div>
            
            <textarea
              placeholder="Describe your product..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="border border-dashed border-gray-300 rounded-xl p-6">
            <p className="text-lg font-medium text-gray-700 mb-4 flex gap-3">
              Choose Images to upload <Upload/>
            </p>

            <input
              type="file"
              multiple
              className="block w-full text-sm text-gray-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Clear
            </button>

            <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition">
              Create product
            </button>
          </div>

        </div>
      </div>
    </div>

 </form>

    </>

  )
}
