import React, { use, useEffect, useState } from "react";
import Item from "../Components/Item";
import Form from "../Components/Form";
import { ethers } from "ethers";

export default function Marketplace() {
  const contractAddress = "0x4a7d826851EC31677eC5cCC569a1FBbb6582abee";
  const contractABI = [
    {
      inputs: [],
      name: "itemCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "items",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "buyer",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "sold",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "ownedItems",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "listItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_newOwner",
          type: "address",
        },
      ],
      name: "_transferItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getItem",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "buyItem",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "getOwnedItems",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [items, setItems] = useState([]);
  const [ownedItems, setownedItems] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      window.ethereum.on("accountsChanged", async (accounts) => {
        setAccount(accounts[0]);

        const signer = provider.getSigner();
        setSigner(signer);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContract(contract);
        loadItems(contract);
        loadOwnedItems(contract, account);
      });

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const signer = provider.getSigner();
      setSigner(signer);

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setContract(contract);
      loadItems(contract);
      loadOwnedItems(contract, account);
    };

    init();
  }, []);

  const loadItems = async (contract) => {
    const itemcount = await contract.itemCount();
    let items = [];
    for (let i = 1; i <= itemcount; i++) {
      const item = await contract.items(i);
      items.push(item);
    }
    setItems(items);
  };

  const loadOwnedItems = async (contract, owner) => {
    const ownedItemsIDs = await contract.getItemsByOwner(owner);
    let ownedItems = [];
    for (let i = 1; i < ownedItems.length; i++) {
      const item = await contract.items(ownedItemsIDs[i]);
      ownedItems.push(item);
    }

    setownedItems(ownedItems);
  };

  const listItem = async (name, description, price) => {
    if (!contract) {
      console.error("Le contrat n'est pas chargé");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      console.error("Prix invalide :", price);
      alert("Veuillez entrer un prix valide en ETH.");
      return;
    }

    try {
      const tx = await contract.listItem(
        name,
        description,
        ethers.utils.parseEther(price.toString())
      );
      await tx.wait();
      loadItems(contract);
      document.getElementById("itemName").value = "";
      document.getElementById("itemDescription").value = "";
      document.getElementById("itemPrice").value = "";
    } catch (error) {
      console.error("Erreur lors de la mise en vente :", error);
    }
  };

  return (
    <div>
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
      </div>
      <div className="px-30 lg:px-8">
        <Item />
        <Form listItem={listItem} />
      </div>
    </div>
  );
}
