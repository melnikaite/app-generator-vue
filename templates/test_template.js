var ItemContract = artifacts.require("./ItemContract.sol");

contract('ItemContract', function(accounts) {
  it("should assert true", async function() {
    var addressRegistry;
    var revertFound;
    var entity01 = "entity0.1"; 
    var entity02 = "entity0.2";
    var entity11 = "entity1.1";
    var entityNonExistent = "entityNonExistent";
    var originalfield = " field ";
    var field = originalfield;
    var changedField = " changed field ";
    var entity;
    var account;
    itemContract = await ItemContract.deployed();

//CREATE TESTS

    entity = entity01;  
    account = accounts[0];
    var result = await itemContract.createItem (entity, entity + field +"1", entity + field +"2" ,  {from:account});
    assert.isOk(result,  entity + " should be created successfully");
    
    entity = entity02;
    account = accounts[0];    
    var result = await itemContract.createItem (entity, entity + field +"1", entity + field +"2" ,  {from:account});
    assert.isOk(result,  entity + " should be created successfully");

    entity = entity11;
    account = accounts[1];    
    var result = await itemContract.createItem (entity, entity + field +"1", entity + field +"2" ,  {from:account});
    assert.isOk(result,  entity + " should be created successfully");

    //check ItemCreated event
    //  result=tx reciept that has the log/events
    assert.equal('ItemCreated',result.logs[0].event);
    console.log("event =", result.logs[0].event);

    //duplicate entity creation should fail
    entity = entity11;
    account = accounts[1];  
    revertFound = false;
    try {
      var result = await itemContract.createItem (entity, entity + field +"1", entity + field +"2" ,  {from:account});
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } 
    assert(revertFound, "duplicate entity creation should fail");
    
    //READ TESTS 

    //read non existent item
    entity = entityNonExistent;
    account = '0x0000000000000000000000000000000000000000';
    var results = await itemContract.readItem.call(entity);
    assert.equal (results[0], account, entity + " should be from account " + account);

    //read an ok item
    entity = entity01;
    account = accounts[0];  
    var results = await itemContract.readItem.call(entity);
    assert.equal (results[0], account, entity + " should be from account " + account);
    assert.equal (results[2], entity + field + "1", " should be " + entity + field + "1");
    assert.equal (results[3], entity + field + "2", " should be " + entity + field + "2");
 
  //UPDATE TESTS  
  

    //not a valid update - from the wrong account
    entity = entity01;
    account = accounts[1];    //wrong account
    revertFound = false;
  try {
      var result = await itemContract.updateItem (entity, entity + changedField + "1",  entity + changedField + "2" , {from:account});
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } 
    assert(revertFound, "update from the wrong account should fail");

    results = await itemContract.readItem.call(entity);
    field = originalfield;
    assert.equal (results[2], entity + field + "1", " should be " + entity + field + "1");


    //valid update
    entity = entity01;
    account = accounts[0]; 
    var result = await itemContract.updateItem (entity, entity + changedField + "1",  entity + changedField + "2" , {from:account});
    assert.isOk(result," should be updated now");
    results = await itemContract.readItem.call(entity);
    field = changedField;
    assert.equal (results[2], entity + field + "1", " should be " + entity + field + "1");
    assert.equal (results[3], entity + field + "2", " should be " + entity + field + "2");

    //check ItemUpdated event
    assert.equal('ItemUpdated',result.logs[0].event);
    console.log("event =", result.logs[0].event);

    
    //COUNT TESTS

    //check count
    result = await itemContract.countItem.call();
    assert.equal(result, 3, "There should be 3 items");


    //DELETE TESTS

    //not a valid delete - from a wrong account
    entity = entity02;
    account = accounts[1]; 
    field = originalfield;
    revertFound = false;
    try {
      result = await itemContract.deleteItem(entity,{from:account});
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } 
    assert(revertFound, "delete from the wrong account should fail");
    
    results = await itemContract.readItem.call(entity);
    assert.equal (results[2], entity + field + "1", " should be " + entity + field + "1");

    //valid delete - from owner account
    entity = entity02;
    account = accounts[0]; 
    result = await itemContract.deleteItem(entity,{from:account});
    assert.isOk(result, entity + " should get deleted by valid owner");
    result = await itemContract.countItem.call();
    assert.equal(result, 2, "There should be 2 items after delete");
 
    //valid delete - by contract owner
    entity = entity11;
    account = accounts[0]; 
    result = await itemContract.deleteItem(entity,{from:account});
    assert.isOk(result, entity + " should get deleted by contract owner");
    result = await itemContract.countItem.call();
    assert.equal(result, 1, "There should be 1 items after delete");

  });
});

