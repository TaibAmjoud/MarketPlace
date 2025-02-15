import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function Form({ listItem }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="border-t border-gray-900/10 pt-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Sell your NFT
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              NFT Name
            </label>
            <div className="mt-2">
              <input
                id="itemName"
                name="itemName"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="region"
              className="block text-sm/6 font-medium text-gray-900"
            >
              NFT URL
            </label>
            <div className="mt-2">
              <input
                id="itemDescription"
                name="itemDescription"
                type="text"
                placeholder="https://"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="postal-code"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                id="itemPrice"
                name="itemPrice"
                type="text"
                placeholder="ETH"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-5 mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() =>
            listItem(
              document.getElementById("itemName").value,
              document.getElementById("itemDescription").value,
              document.getElementById("itemPrice").value
            )
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}
