const Market = artifacts.require("Market");
 
contract("Market", (accounts) => {
  let marketInstance;
  const owner = accounts[0];
  const buyer = accounts[1];
 
  beforeEach(async () => {
    marketInstance = await Market.new();
  });
 
  it("should list an item correctly", async () => {
    await marketInstance.listItem(
      "Item1",
      "Description1",
      web3.utils.toWei("1", "ether"),
      { from: owner }
    );
    const item = await marketInstance.getItem(1);
 
    assert.equal(item[0].toNumber(), 1, "Item ID incorrect");
    assert.equal(item[1], owner, "Owner incorrect");
    assert.equal(item[3], "Item1", "Item name incorrect");
    assert.equal(item[4], "Description1", "Description incorrect");
    assert.equal(
      item[5].toString(),
      web3.utils.toWei("1", "ether"),
      "Price incorrect"
    );
    assert.equal(item[6], false, "Item should not be sold");
  });
 
  it("should allow item transfer", async () => {
    await marketInstance.listItem(
      "Item1",
      "Description1",
      web3.utils.toWei("1", "ether"),
      { from: owner }
    );
    await marketInstance._transferItem(1, buyer, { from: owner });
 
    const item = await marketInstance.getItem(1);
    assert.equal(item[1], buyer, "Ownership transfer failed");
  });
 
  it("should allow buying an item", async () => {
    await marketInstance.listItem(
      "Item1",
      "Description1",
      web3.utils.toWei("1", "ether"),
      { from: owner }
    );
    await marketInstance.buyItem(1, {
      from: buyer,
      value: web3.utils.toWei("1", "ether"),
    });
 
    const item = await marketInstance.getItem(1);
    assert.equal(item[6], true, "Item should be marked as sold");
  });
 
  it("should revert if trying to buy with insufficient funds", async () => {
    await marketInstance.listItem(
      "Item1",
      "Description1",
      web3.utils.toWei("1", "ether"),
      { from: owner }
    );
 
    try {
      await marketInstance.buyItem(1, {
        from: buyer,
        value: web3.utils.toWei("0.5", "ether"),
      });
      assert.fail("Transaction should have failed");
    } catch (error) {
      assert.include(error.message, "Not enough funds to purchase item");
    }
  });
 
  it("should allow getting owned items", async () => {
    await marketInstance.listItem(
      "Item1",
      "Description1",
      web3.utils.toWei("1", "ether"),
      { from: owner }
    );
    const ownedItems = await marketInstance.getOwnedItems(owner);
 
    assert.equal(ownedItems.length, 1, "Owned items length incorrect");
    assert.equal(ownedItems[0].toNumber(), 1, "Owned item ID incorrect");
  });
});