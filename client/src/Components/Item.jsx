import React from "react";
import Pagination from "./Pagination";
import { ethers } from "ethers";

const products = [
  {
    id: 1,
    name: "Bored Ape Yacht 8321",
    href: "#",
    imageSrc:
      "https://www.apprendre-a-dessiner.org/wp-content/uploads/2022/04/NFT-artiste-bored-ape-1.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "50 ETH",
    color: "Black",
  },
  {
    id: 1,
    name: "Bored Ape Yacht 3761",
    href: "#",
    imageSrc:
      "https://media.licdn.com/dms/image/v2/D4D12AQEbixQVfGw-gw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1659719389283?e=2147483647&v=beta&t=jtzWqAvK3Dq5vd1eHWRW5zEN2FpLwP-kVmYAlZ5bmmA",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "20 ETH",
    color: "Black",
  },
  {
    id: 1,
    name: "Bored Ape Yacht 8719",
    href: "#",
    imageSrc:
      "https://nftcalendar.io/storage/uploads/events/2022/5/4IL1FjiSsWJINfa9vYYHo7HiXKKibLfwOr0W8c4m.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "35 ETH",
    color: "Black",
  },
  {
    id: 1,
    name: "Bored Ape Yacht 9871",
    href: "#",
    imageSrc:
      "https://i.seadn.io/gae/0SqhT9xgg_KeCmE-vyWtBDrrxGazn4iVJcSqiocXuq28MI1Bk6xgFcnPGHe9Wc8f7sBWDpEtuEyxILBCLPzFiTcO0Q60e-43uZPgiQ?auto=format&dpr=1&w=1000",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "32 ETH",
    color: "Black",
  },
  // More products...
];

export default function Item({ items }) {
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="border-t border-gray-900/10 pt-5 text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <img
                alt={item.description}
                src={item.description}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {ethers.utils.formatEther(item.price)} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
