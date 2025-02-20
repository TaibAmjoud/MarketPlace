import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
 
export default function Form({ listItem }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.name.trim()) {
      newErrors.name = "NFT name is required";
    }
 
    if (!formData.url.trim()) {
      newErrors.url = "NFT URL is required";
    } else if (!formData.url.startsWith("https://")) {
      newErrors.url = "URL must start with https://";
    }
 
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async () => {
    if (!validateForm()) return;
 
    try {
      setLoading(true);
      await listItem(formData.name, formData.url, formData.price);
      setFormData({ name: "", url: "", price: "" });
    } catch (error) {
      console.error("Error listing item:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("item", "").toLowerCase()]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id.replace("item", "").toLowerCase()]: null,
    }));
  };
 
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              List Your NFT
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create your NFT listing in the marketplace
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <PhotoIcon className="h-6 w-6 text-white" />
          </div>
        </div>
 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NFT Name
            </label>
            <input
              id="itemName"
              value={formData.name}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-2 rounded-lg bg-gray-50 border
                transition-colors duration-200
                ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50
              `}
              placeholder="Enter NFT name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
 
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NFT URL
            </label>
            <input
              id="itemUrl"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://"
              className={`
                w-full px-4 py-2 rounded-lg bg-gray-50 border
                transition-colors duration-200
                ${
                  errors.url
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50
              `}
            />
            {errors.url && (
              <p className="mt-1 text-xs text-red-500">{errors.url}</p>
            )}
          </div>
 
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <div className="relative">
              <input
                id="itemPrice"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className={`
                  w-full px-4 py-2 rounded-lg bg-gray-50 border pr-12
                  transition-colors duration-200
                  ${
                    errors.price
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }
                  focus:outline-none focus:ring-2 focus:ring-opacity-50
                `}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">ETH</span>
              </div>
            </div>
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>
        </div>
 
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              px-6 py-3 rounded-lg font-semibold text-white
              transform transition-all duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:-translate-y-0.5"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "List NFT"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}