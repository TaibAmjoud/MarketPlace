import React, { useState } from "react";
import Pagination from "./Pagination";
import { ethers } from "ethers";
 
export default function OwnedItems({
  items,
  contract,
  account,
  loadItems,
  loadOwnedItems,
}) {
  const [transferAddresses, setTransferAddresses] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
 
  const handleTransfer = async (id, toAddress) => {
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));
      setError((prev) => ({ ...prev, [id]: null }));
 
      if (!contract) {
        throw new Error("Contract not initialized");
      }
 
      if (!ethers.utils.isAddress(toAddress)) {
        throw new Error("Please enter a valid Ethereum address");
      }
 
      if (toAddress.toLowerCase() === account.toLowerCase()) {
        throw new Error("Cannot transfer to your own address");
      }
 
      const tx = await contract._transferItem(id, toAddress);
      await tx.wait();
 
      if (loadItems) await loadItems(contract);
      if (loadOwnedItems) await loadOwnedItems(contract, account);
 
      setTransferAddresses((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error transferring item:", error);
      setError((prev) => ({
        ...prev,
        [id]: error.message || "Error during transfer",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };
 
  const handleInputChange = (id, value) => {
    setTransferAddresses((prev) => ({ ...prev, [id]: value }));
    setError((prev) => ({ ...prev, [id]: null }));
  };
 
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Your NFT Collection
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
        </div>
 
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-square w-full overflow-hidden rounded-t-2xl relative">
                <img
                  src={item.description}
                  alt={item.name}
                  className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  Owned
                </div>
              </div>
 
              {/* Content Container */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Value: {ethers.utils.formatEther(item.price)} ETH
                  </p>
                </div>
 
                {/* Transfer Form */}
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={transferAddresses[item.id] || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, e.target.value)
                      }
                      placeholder="Enter recipient address"
                      className={`
                        w-full px-4 py-2 border rounded-lg bg-gray-50
                        transition-colors duration-200
                        ${
                          error[item.id]
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        }
                        focus:outline-none focus:ring-2 focus:ring-opacity-50
                      `}
                    />
                    {error[item.id] && (
                      <p className="mt-1 text-xs text-red-500">
                        {error[item.id]}
                      </p>
                    )}
                  </div>
 
                  <button
                    className={`
                      w-full px-4 py-2 rounded-lg font-semibold
                      transform transition-all duration-200
                      ${
                        loading[item.id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5"
                      }
                      text-white shadow-md
                    `}
                    onClick={() =>
                      handleTransfer(item.id, transferAddresses[item.id])
                    }
                    disabled={loading[item.id]}
                  >
                    {loading[item.id] ? (
                      <span className="flex items-center justify-center">
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
                      "Transfer NFT"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You don't own any NFTs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
 