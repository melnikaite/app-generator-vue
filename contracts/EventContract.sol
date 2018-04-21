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
    string   name;
  }

  mapping(bytes32 => Event)  eventMap;
  bytes32[]   eventArray;

  function EventContract() public {
    contractOwner = msg.sender;
  }

  // Creates Event
  function createEvent(bytes32 id, 
        //generated fields
        string name) 
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
    eventMap[id].name = name; 
    return true;
  }

  // Returns an Event by name
  function  readEvent(bytes32 id) constant public returns (address,uint,
      //generated fields
      string) {
    return (eventMap[id].owner, eventMap[id].lastUpdated, 
      //generated fields
            eventMap[id].name);
  }

  // Returns an Event by name
  function  readEventByIndex(uint index) constant public returns (address,uint,
      //generated fields
      string) {
    require(index < eventArray.length);
    bytes32 id = eventArray[index];
    return (eventMap[id].owner, eventMap[id].lastUpdated, 
      //generated fields
            eventMap[id].name);
  }
 // Updates Event 
  function updateEvent(bytes32 id, 
        //generated fields
        string name) 
        public  returns (bool) {
    //event should exist
    require (eventMap[id].owner != address(0));
    require (eventMap[id].owner == msg.sender || contractOwner == msg.sender); //only event owner or contract owner can update   

    eventMap[id].lastUpdated = now;
    //generated fields
    eventMap[id].name = name;
    return true;
  }
  
  // Deletes Event
  function deleteEvent  (bytes32 id) public  returns (bool) {
    // if(bytes(eventMap[id].name).length != 0) return false; //TODO  get rid of names as generated field
    //event should  exist
    require (eventMap[id].owner != address(0));
    require (eventMap[id].owner == msg.sender || contractOwner == msg.sender); //only event owner or contract owner can update   

    var i = eventMap[id].index;
    var lastEvent = eventArray[eventArray.length-1];
    eventMap[lastEvent].index = i;
    eventArray[i] = lastEvent;
    eventArray.length--;
   
    delete(eventMap[id]);
    return true;
  }

  // Returns eventCount
  function  countEvent() constant public returns (uint) {
    return eventArray.length;
  }


  event ItemCreated(address indexed _address, bytes32 _item);
  event ItemUpdated(address indexed _address, uint _id);
  event ItemDeleted(address indexed _address, uint _id);

}