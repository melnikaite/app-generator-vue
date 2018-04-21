var EventParticipant = artifacts.require("./EventParticipant.sol");

contract('EventParticipant', function(accounts) {
  it("should assert true", async function() {
    var addressRegistry;

    eventParticipant = await EventParticipant.deployed();
    var result = await eventParticipant.createEvent ("event0.1", "Event 0.1",{from:accounts[0]});
    assert.isOk(result, "Event 0.1 should be created successfully");
    result = await eventParticipant.createEvent ("event0.2", "Event 0.2",{from:accounts[0]});
    assert.isOk(result, "Event 0.2 should be created successfully");
    result = await eventParticipant.createEvent ("event1.1", "Event 1.1",{from:accounts[1]});
    assert.isOk(result, "Event 1.1 should be created successfully");
    // result = await eventParticipant.createEvent ("event1.1", "Event 1.1",{from:accounts[1]});
    // assert.isNotOk(result, "Repeat Event 1.1 should fail");
    var results = await eventParticipant.readEvent.call("event0.1");
    assert.equal (results[0], accounts[0], "0.1 should be from account 0");
    assert.equal (results[2], "Event 0.1", "name should be Event 0.1");

    result = await eventParticipant.updateEvent("event0.1", "Event 0.1 has been changed",{from:accounts[1]});
    console.log (result);
    // assert.isNotOk(result,"event0.1 cannot be changed from the wrong address");
    results = await eventParticipant.readEvent.call("event0.1");
    assert.equal (results[2], "Event 0.1", "name should be Event 0.1");

    result = await eventParticipant.updateEvent("event0.1", "Event 0.1 has been changed",{from:accounts[0]});
    assert.isOk(result,"event0.1 should be changed now");
    results = await eventParticipant.readEvent.call("event0.1");
    assert.equal (results[2], "Event 0.1 has been changed", "Event 0.1 has been changed");

    // //check count
    // result = await eventParticipant.countEvent.call();
    // assert.equal(result, 3, "There should be 3 events");

    // // delete 1 event and check count
    // result = await eventParticipant.deleteEvent("event0.1",{from:accounts[1]});
    // // assert.isNotOk(result,"event0.1 cannot be changed from the wrong address");
    // results = await eventParticipant.readEvent.call("event0.1");
    // assert.equal (results[2], "Event 0.1", "name should be Event 0.1");

    // result = await eventParticipant.deleteEvent("event0.1",{from:accounts[0]});
    // // assert.isOk(result,"event0.1 should get deleted");
    // result = await eventParticipant.countEvent.call();
    // assert.equal(result, 2, "There should be 2 events");






      // await addressRegistry.registerName("Cindy Crawford",{from:accounts[2]});
      // await addressRegistry.registerName("George Clooney",{from:accounts[1]});
      // await addressRegistry.registerName("Jackie Chan",{from:accounts[0]});
      
      // console.log("Initial names:");
      // result = await addressRegistry.count.call();
      // curCount = result.toNumber();
      // console.log("Count=", curCount);
      // // printNames(addressRegistry, curCount);



      // await addressRegistry.updateName(accounts[2],"Cindy from 0",{from:accounts[0]});
      // // await addressRegistry.updateName(accounts[2],"Cindy from 2",{from:accounts[2]});
      
      // console.log("Names after update:");
      // printNames(addressRegistry, curCount);

      // // Lets delete George
      // await addressRegistry.registerName("",{from:accounts[1]});
      // result = await addressRegistry.count.call();
      // curCount = result.toNumber();
      // console.log("Count after register empty=", curCount);
      // // Should have deleted George Clooney
      // console.log("Names after registering with empty:");
      // printNames(addressRegistry, curCount)

      // // Delete Cindy
      // await addressRegistry.deleteName(accounts[2], {from:accounts[0]});

      // result = await addressRegistry.count.call();
      // curCount = result.toNumber();
      // console.log("Count after deleting=", curCount);
      //         // Should print only Jackie Chen
      // console.log("Names after deleting:");
      // // printNames(addressRegistry, curCount)
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