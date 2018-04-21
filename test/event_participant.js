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