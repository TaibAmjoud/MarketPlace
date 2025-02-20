import React from "react";
import { Link } from "react-router-dom";
 
const people = [
  {
    name: "Taib Amjoud",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E35AQEqoa_aESKnfg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1729087169855?e=1740160800&v=beta&t=oTxqfcPZZ8HpyubNXJQEDw-njASle1KZ65rI4Rn4PGY",
  },
  {
    name: "Fouad El Mouden",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQHrK-ptVmiB5Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710120738417?e=2147483647&v=beta&t=2kB0Rk5ZpvAmqtpeZJ3jj6jzuLkaG_7TdjqLyi43-Vw",
  },
  {
    name: "Anis NAIT CHABANE",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQE8zkl8ojU2lA/profile-displayphoto-shrink_400_400/B4EZOvXv_AHEAs-/0/1733814060595?e=1745452800&v=beta&t=TaYhRyXwfSqUjOhhAm4Ho2NHuD_xgj80vv5hb75I9Ow",
  },
];
 
export default function Home() {
  return (
    <div className="relative isolate">
      {/* Background gradient effect */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
 
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Achetez et vendez des actifs numériques
          </h1>
          <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
            Une marketplace décentralisée sécurisée par la blockchain. Échangez
            des tokens et des NFTs facilement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/Marketplace">
              <button className="transform transition-all duration-300 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5">
                Accéder à la Marketplace
              </button>
            </Link>
            <a
              href="#"
              className="text-lg font-semibold text-gray-900 flex items-center hover:text-purple-600 transition-colors"
            >
              En savoir plus
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
 
      {/* Team Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Notre équipe
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
 
          <ul className="mt-16 flex flex-wrap justify-center gap-8">
            {people.map((person) => (
              <li
                key={person.name}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-72"
              >
                <div className="flex items-center gap-x-6">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-purple-600/20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {person.name}
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
 
      {/* Tech Stack Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-4">
            Tech Stack
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-16"></div>
 
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {[
              {
                name: "Truffle",
                src: "https://archive.trufflesuite.com/assets/logo.png",
              },
              {
                name: "Ganache",
                src: "https://blog.kennycoder.io/2020/02/09/Ganache-%E5%BF%AB%E9%80%9F%E9%96%8B%E7%99%BCEthereum-Blockchain%E7%9A%84%E5%B7%A5%E5%85%B7/cover.png",
              },
              {
                name: "Ethereum",
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/langfr-220px-Ethereum-icon-purple.svg.png",
              },
              {
                name: "Solidity",
                src: "https://talks.freelancerepublik.com/wp-content/uploads/2022/11/solidity.jpeg",
              },
              {
                name: "React",
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
              },
            ].map((tech) => (
              <div
                key={tech.name}
                className="col-span-1 flex justify-center transform transition-transform hover:scale-110"
              >
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}
 