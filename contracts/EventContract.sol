pragma solidity ^0.4.4;


contract EventContract {

  address   contractOwner;

  struct Event {
    //internal fields
    uint      index;
    address   owner;
    uint      lastUpdated;
    bool initialized;
    //generated fields
    string name; 
bytes32 location; 



  }

  mapping(bytes32 => Event) public eventMap;
  bytes32[] public eventArray;

  function EventContract() public {
    contractOwner = msg.sender;
  }

  // Creates Event
  function createEvent(bytes32 id,
        //generated fields
        string name, bytes32 location)
        public returns (bool) {

    //event already exists
     require (eventMap[id].owner == address(0));

    //create new event
    //internal fields
    eventMap[id].index = eventArray.length;
    eventArray.push(id);
    eventMap[id].owner = msg.sender;
    eventMap[id].lastUpdated = now;
    //generated fields
    eventMap[id].name=name;
 eventMap[id].location=location;
    EventCreated(id,
        //generated fields - only param 1???
        name, location);
    return true;
  }

  // Returns an Event by id
  function  readEvent(bytes32 id) constant public returns (address,uint,
      //generated fields
      string, bytes32) {
    return (eventMap[id].owner, eventMap[id].lastUpdated,
      //generated fields
            eventMap[id].name, eventMap[id].location);
  }

  // Returns an Event by index
  function  readEventByIndex(uint index) constant public returns (address,uint,
      //generated fields
        string, bytes32) {
    require(index < eventArray.length);
    bytes32 id = eventArray[index];
    return (eventMap[id].owner, eventMap[id].lastUpdated,
      //generated fields
            eventMap[id].name, eventMap[id].location);
  }
 // Updates Event
  function updateEvent(bytes32 id,
        //generated fields
        string name, bytes32 location)
        public  returns (bool) {
    //event should exist
    require (eventMap[id].owner != address(0));
    require (eventMap[id].owner == msg.sender || contractOwner == msg.sender); //only event owner or contract owner can update

    eventMap[id].lastUpdated = now;
    //generated fields
    eventMap[id].name=name;
 eventMap[id].location=location;
    EventUpdated(id,
        //generated fields - only param 1???
        name, location);
    return true;
  }

  // Deletes Event
  function deleteEvent  (bytes32 id) public  returns (bool) {
    //event should  exist
    require (eventMap[id].owner != address(0));
    require (eventMap[id].owner == msg.sender || contractOwner == msg.sender); //only event owner or contract owner can update

    var i = eventMap[id].index;
    var lastEvent = eventArray[eventArray.length-1];
    eventMap[lastEvent].index = i;
    eventArray[i] = lastEvent;
    eventArray.length--;


    EventDeleted(id,
        //generated fields - only param 1???
        eventMap[id].name, eventMap[id].location );
    delete(eventMap[id]);
    return true;
  }

  // Returns eventCount
  function  countEvent() constant public returns (uint) {
    return eventArray.length;
  }


  event EventCreated(bytes32 indexed _id,
        string name, bytes32 location);
  event EventUpdated(bytes32 indexed _id,
        string name, bytes32 location);
  event EventDeleted(bytes32 indexed _id,
        string name, bytes32 location);

}
