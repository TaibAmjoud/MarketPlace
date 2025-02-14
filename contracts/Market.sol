// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Market {
    struct Item {
        uint id;
        address owner;
        address payable buyer;
        string name;
        string description;
        uint price;
        bool sold;
    }

    uint public itemCount = 0;
    mapping(uint => Item) public items;
    mapping(address => uint[]) public ownedItems;

    function listItem(
        string memory _name,
        string memory _description,
        uint _price
    ) public {
        require(_price > 0, "Price must be greater than 0");
        itemCount++;
        items[itemCount] = Item(
            itemCount,
            msg.sender,
            payable(msg.sender),
            _name,
            _description,
            _price,
            false
        );
        ownedItems[msg.sender].push(itemCount);
    }

    function _transferOwnership(
        uint _id,
        address _oldOwner,
        address _newOwner
    ) internal {
        Item storage item = items[_id];
        item.owner = _newOwner;

        uint[] storage fromItems = ownedItems[_oldOwner];
        for (uint i = 0; i < fromItems.length; i++) {
            if (fromItems[i] == _id) {
                fromItems[i] = fromItems[fromItems.length - 1];
                fromItems.pop();
                break;
            }
        }
        ownedItems[_newOwner].push(_id);
    }

    function _transferItem(uint _id, address _newOwner) public {
        Item storage _item = items[_id];
        require(_item.id > 0 && _item.id <= itemCount, "Item does not exist");
        require(
            msg.sender == _item.owner,
            "You are not the owner of this item"
        );
        require(_newOwner != address(0), "Invalid address");
        require(
            _newOwner != msg.sender,
            "You cannot transfer item to yourself"
        );

        _transferOwnership(_id, msg.sender, _newOwner);
    }

    function getItem(
        uint _id
    )
        public
        view
        returns (
            uint,
            address,
            address,
            string memory,
            string memory,
            uint,
            bool
        )
    {
        Item storage _item = items[_id];
        return (
            _item.id,
            _item.owner,
            _item.buyer,
            _item.name,
            _item.description,
            _item.price,
            _item.sold
        );
    }

    function buyItem(uint _id) public payable {
        Item storage item = items[_id];
        require(_id > 0 && _id <= itemCount, "Item does not exist");
        require(!item.sold, "Item is already sold");
        require(msg.value == item.price, "Not enough funds to purchase item");
        require(msg.sender != item.buyer, "You cannot buy your own item");

        item.sold = true;
        item.buyer.transfer(msg.value);

        _transferOwnership(_id, item.buyer, msg.sender);
    }

    function getOwnedItems(address _owner) public view returns (uint[] memory) {
        return ownedItems[_owner];
    }
}
