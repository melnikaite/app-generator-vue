pragma solidity ^0.4.4;


contract ItemContract {

  address   contractOwner;

  struct Item {
    //internal fields
    uint      index;
    address   owner;
    uint      lastUpdated;
    bool initialized;
    //generated fields  
    string   name;
    bytes32 location;
    // uint lengthInHours;
    // uint price;
    // bytes3 currencyTicker;

  }

  mapping(bytes32 => Item) public itemMap;
  bytes32[] public itemArray;

  function ItemContract() public {
    contractOwner = msg.sender;
  }

  // Creates Item
  function createItem(bytes32 id,
        //generated fields
        string name, bytes32 location)
        public returns (bool) {

    //item already exists
     require (itemMap[id].owner == address(0));

    //create new item
    //internal fields
    itemMap[id].index = itemArray.length;
    itemArray.push(id);
    itemMap[id].owner = msg.sender;
    itemMap[id].lastUpdated = now;
    //generated fields
    itemMap[id].name = name;
    itemMap[id].location = location;
    ItemCreated(id,
        //generated fields - only param 1???
        name);
    return true;
  }

  // Returns an Item by name
  function  readItem(bytes32 id) constant public returns (address,uint,
      //generated fields
      string, bytes32) {
    return (itemMap[id].owner, itemMap[id].lastUpdated,
      //generated fields
            itemMap[id].name, itemMap[id].location);
  }

  // Returns an Item by name
  function  readItemByIndex(uint index) constant public returns (address,uint,
      //generated fields
        string, bytes32) {
    require(index < itemArray.length);
    bytes32 id = itemArray[index];
    return (itemMap[id].owner, itemMap[id].lastUpdated,
      //generated fields
            itemMap[id].name, itemMap[id].location);
  }
 // Updates Item
  function updateItem(bytes32 id,
        //generated fields
        string name,
        bytes32 location)
        public  returns (bool) {
    //item should exist
    require (itemMap[id].owner != address(0));
    require (itemMap[id].owner == msg.sender || contractOwner == msg.sender); //only item owner or contract owner can update

    itemMap[id].lastUpdated = now;
    //generated fields
    itemMap[id].name = name;
    itemMap[id].location = location;
    ItemUpdated(id,
        //generated fields - only param 1???
        name);
    return true;
  }

  // Deletes Item
  function deleteItem  (bytes32 id) public  returns (bool) {
    // if(bytes(itemMap[id].name).length != 0) return false; //TODO  get rid of names as generated field
    //item should  exist
    require (itemMap[id].owner != address(0));
    require (itemMap[id].owner == msg.sender || contractOwner == msg.sender); //only item owner or contract owner can update

    var i = itemMap[id].index;
    var lastItem = itemArray[itemArray.length-1];
    itemMap[lastItem].index = i;
    itemArray[i] = lastItem;
    itemArray.length--;
    var name = itemMap[lastItem].name;

    ItemDeleted(id,
        //generated fields - only param 1???
        name);
    delete(itemMap[id]);
    return true;
  }

  // Returns itemCount
  function  countItem() constant public returns (uint) {
    return itemArray.length;
  }


  event ItemCreated(bytes32 indexed _id,
        //generated fields - only param 1???
        string  _name);
  event ItemUpdated(bytes32 indexed _id,
        //generated fields - only param 1???
        string  _name);
  event ItemDeleted(bytes32 indexed _id,
        //generated fields - only param 1???
        string  _name);

}
