import React from "react";
import { ethers } from "ethers";
import Pagination from "./Pagination";
 
export default function Item({
  items,
  account,
  contract,
  loadItems,
  loadOwnedItems,
}) {
  const purchaseItem = async (id, price) => {
    try {
      const tx = await contract.buyItem(id, {
        value: ethers.utils.parseEther(price),
      });
      await tx.wait();
 
      if (loadItems) await loadItems(contract);
      if (loadOwnedItems) await loadOwnedItems(contract, account);
    } catch (error) {
      console.error("Error purchasing item:", error);
      alert("Error during purchase. Please check console for details.");
    }
  };
 
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            NFT Marketplace
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
 
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden rounded-t-2xl relative">
                <img
                  src={item.description}
                  alt={item.name}
                  className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
                {item.owner.toLowerCase() === account.toLowerCase() && (
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    My NFT
                  </div>
                )}
              </div>
 
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Price:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {ethers.utils.formatEther(item.price)} ETH
                    </span>
                  </div>
                </div>
 
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.owner.toLowerCase() === account.toLowerCase()
                          ? "bg-purple-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-500 ml-2">
                      {item.owner.toLowerCase() === account.toLowerCase()
                        ? "Owned by you"
                        : "Available for purchase"}
                    </span>
                  </div>
 
                  {item.owner.toLowerCase() !== account.toLowerCase() && (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() =>
                        purchaseItem(
                          item.id,
                          ethers.utils.formatEther(item.price)
                        )
                      }
                    >
                      Buy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 