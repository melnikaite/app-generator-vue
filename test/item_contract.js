var ItemContract = artifacts.require("./ItemContract.sol");

contract('ItemContract', function(accounts) {
  it("should assert true", async function() {
    var addressRegistry;
    var revertFound;
    itemContract = await ItemContract.deployed();
    var result = await itemContract.createItem ("item0.1", "Item 0.1", "Minsk" ,{from:accounts[0]});
    assert.isOk(result, "Item 0.1 should be created successfully");
    result = await itemContract.createItem ("item0.2", "Item 0.2","London",{from:accounts[0]});
    assert.isOk(result, "Item 0.2 should be created successfully");
    result = await itemContract.createItem ("item1.1", "Item 1.1","New York",{from:accounts[1]});
    assert.isOk(result, "Item 1.1 should be created successfully");
    try {
      revertFound = false;
      result = await itemContract.createItem ("item1.1", "Item 1.1","Paris",{from:accounts[1]});
      assert.isNotOk(result, "Repeat Item 1.1 should fail");
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    var results = await itemContract.readItem.call("item0.1");
    assert.equal (results[0], accounts[0], "0.1 should be from account 0");
    assert.equal (results[2], "Item 0.1", "name should be Item 0.1");

    
    //should throw an  exception

    //not a valid update
   try {
      revertFound = false;
      result = await itemContract.updateItem("item0.1", "Item 0.1 has been changed","Lisbon", {from:accounts[1]});
      // console.log (result);
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    results = await itemContract.readItem.call("item0.1");
    assert.equal (results[2], "Item 0.1", "name should still be Item 0.1");

    //valid update
    result = await itemContract.updateItem("item0.1", "Item 0.1 has been changed","Paris", {from:accounts[0]});
    assert.isOk(result,"item0.1 should be changed now");
    results = await itemContract.readItem.call("item0.1");
    assert.equal (results[2], "Item 0.1 has been changed", "Item 0.1 has been changed");
    assert.equal (web3.toUtf8(results[3]), "Paris","location should be paris");
    

    //check count
    result = await itemContract.countItem.call();
    assert.equal(result, 3, "There should be 3 items");

    // delete 1 item and check count


    //not a valid delete
    try {
      revertFound = false;
      result = await itemContract.deleteItem("item0.2",{from:accounts[1]});
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    // assert.isNotOk(result,"item0.1 cannot be changed from the wrong address");
    results = await itemContract.readItem.call("item0.2");
    assert.equal (results[2], "Item 0.2", "name should be Item 0.2");

    //valid delete
    result = await itemContract.deleteItem("item0.2",{from:accounts[0]});
    assert.isOk(result,"item0.2 should get deleted");
    result = await itemContract.countItem.call();
    assert.equal(result, 2, "There should be 2 items");

    //valid delete by contract owner
    result = await itemContract.deleteItem("item1.1",{from:accounts[0]});
    assert.isOk(result,"item1.1 should get deleted by contract owner");
    result = await itemContract.countItem.call();
    assert.equal(result, 1, "There should be 1 item");
    

  });
});

// async function  printNames(addressRegistry, count){
//     // var ctr = 0;
//     for(i=0; i < count; i++){
//         result = await addressRegistry.getByIndex.call(i);
//           var name = web3.toAscii(result[1]);
//           name = name.replace(/\0/g, '');
//           console.log(result[0],'----',name,'---', new Date(result[2].toNumber()*1000));
        
//     }
// }