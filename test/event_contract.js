var EventContract = artifacts.require("./EventContract.sol");

contract('EventContract', function(accounts) {
  it("should assert true", async function() {
    var addressRegistry;
    var revertFound;
    eventContract = await EventContract.deployed();
    var result = await eventContract.createEvent ("event0.1", "Event 0.1", "Minsk" ,{from:accounts[0]});
    assert.isOk(result, "Event 0.1 should be created successfully");
    result = await eventContract.createEvent ("event0.2", "Event 0.2","London",{from:accounts[0]});
    assert.isOk(result, "Event 0.2 should be created successfully");
    result = await eventContract.createEvent ("event1.1", "Event 1.1","New York",{from:accounts[1]});
    assert.isOk(result, "Event 1.1 should be created successfully");

    //  result=tx reciept that has the log/events
    // dumpEvents(result);
    assert.equal('EventCreated',result.logs[0].event);
    console.log("event =", result.logs[0].event);


    try {
      revertFound = false;
      result = await eventContract.createEvent ("event1.1", "Event 1.1","Paris",{from:accounts[1]});
      assert.isNotOk(result, "Repeat Event 1.1 should fail");
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    var results = await eventContract.readEvent.call("event0.1");
    assert.equal (results[0], accounts[0], "0.1 should be from account 0");
    assert.equal (results[2], "Event 0.1", "name should be Event 0.1");

    
    //should throw an  exception

    //not a valid update
   try {
      revertFound = false;
      result = await eventContract.updateEvent("event0.1", "Event 0.1 has been changed","Lisbon", {from:accounts[1]});
      // console.log (result);
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    results = await eventContract.readEvent.call("event0.1");
    assert.equal (results[2], "Event 0.1", "name should still be Event 0.1");

    //valid update
    result = await eventContract.updateEvent("event0.1", "Event 0.1 has been changed","Paris", {from:accounts[0]});
    assert.isOk(result,"event0.1 should be changed now");
    results = await eventContract.readEvent.call("event0.1");
    assert.equal (results[2], "Event 0.1 has been changed", "Event 0.1 has been changed");
    assert.equal (web3.toUtf8(results[3]), "Paris","location should be paris");

    assert.equal('EventUpdated',result.logs[0].event);
    console.log("event =", result.logs[0].event);

    

    //check count
    result = await eventContract.countEvent.call();
    assert.equal(result, 3, "There should be 3 events");

    // delete 1 event and check count


    //not a valid delete
    try {
      revertFound = false;
      result = await eventContract.deleteEvent("event0.2",{from:accounts[1]});
    } catch (error) {
      revertFound = error.message.search("revert") >= 0;
    } finally {
      assert(revertFound, "Expected revert");
    }
    // assert.isNotOk(result,"event0.1 cannot be changed from the wrong address");
    results = await eventContract.readEvent.call("event0.2");
    assert.equal (results[2], "Event 0.2", "name should be Event 0.2");

    //valid delete
    result = await eventContract.deleteEvent("event0.2",{from:accounts[0]});
    assert.isOk(result,"event0.2 should get deleted");
    result = await eventContract.countEvent.call();
    assert.equal(result, 2, "There should be 2 events");

    //valid delete by contract owner
    result = await eventContract.deleteEvent("event1.1",{from:accounts[0]});
    assert.isOk(result,"event1.1 should get deleted by contract owner");

    assert.equal('EventDeleted',result.logs[0].event);
    console.log("event =", result.logs[0].event);


    result = await eventContract.countEvent.call();
    assert.equal(result, 1, "There should be 1 event");


    

  });
});


// Truffle: you may access the log in receipt
function  dumpEvents(result){
  for(var i=0; i<result.logs.length;i++){
        console.log(result.logs[i].event,'>>', result.logs[i].args.name,' ',result.logs[i].args.howmuch.toNumber())
  }
}

// async function  printNames(addressRegistry, count){
//     // var ctr = 0;
//     for(i=0; i < count; i++){
//         result = await addressRegistry.getByIndex.call(i);
//           var name = web3.toUtf8(result[1]);
//           name = name.replace(/\0/g, '');
//           console.log(result[0],'----',name,'---', new Date(result[2].toNumber()*1000));
        
//     }
// }