import React from "react";
import { Link } from "react-router-dom";

const people = [
  {
    name: "Taib Amjoud",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E35AQEqoa_aESKnfg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1729087169855?e=1740160800&v=beta&t=oTxqfcPZZ8HpyubNXJQEDw-njASle1KZ65rI4Rn4PGY",
  },
  {
    name: "Fouad El Mouden",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQHrK-ptVmiB5Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710120738417?e=2147483647&v=beta&t=2kB0Rk5ZpvAmqtpeZJ3jj6jzuLkaG_7TdjqLyi43-Vw",
  },
];

export default function Home() {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto py-30 sm:py-30 lg:py-30">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Achetez et vendez des actifs numériques
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Une marketplace décentralisée sécurisée par la blockchain. Échangez
            des tokens et des NFTs facilement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/Marketplace">
              <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Accéder à la Marketplace
              </a>
            </Link>

            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-whit py-24 sm:py-2">
        <div className="mx-auto max-w">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              Notre team
            </h2>
          </div>
          <ul
            role="list"
            className="pt-12 mx-auto max-w-2xl grid gap-x-60 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-5"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="size-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
            Tech Stack
          </h2>
          <div className="border-t border-b border-gray-900/10 pt-15 pb-15 mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Truffle"
              src="https://archive.trufflesuite.com/assets/logo.png"
              width={158}
              height={48}
              className="col-span-2 max-h-13 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Ganache"
              src="https://blog.kennycoder.io/2020/02/09/Ganache-%E5%BF%AB%E9%80%9F%E9%96%8B%E7%99%BCEthereum-Blockchain%E7%9A%84%E5%B7%A5%E5%85%B7/cover.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Ethereum"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/langfr-220px-Ethereum-icon-purple.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-15 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="Solidity"
              src="https://talks.freelancerepublik.com/wp-content/uploads/2022/11/solidity.jpeg"
              width={158}
              height={48}
              className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
            />
            <img
              alt="React"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-14 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
