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
    string name; 
string location; 



  }

  mapping(bytes32 => Item) public itemMap;
  bytes32[] public itemArray;

  function ItemContract() public {
    contractOwner = msg.sender;
  }

  // Creates Item
  function createItem(bytes32 id,
        //generated fields
        string name, string location)
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
    itemMap[id].name=name;
 itemMap[id].location=location;
    ItemCreated(id,
        //generated fields - only param 1???
        name, location);
    return true;
  }

  // Returns an Item by id
  function  readItem(bytes32 id) constant public returns (address,uint,
      //generated fields
      string, string) {
    return (itemMap[id].owner, itemMap[id].lastUpdated,
      //generated fields
            itemMap[id].name, itemMap[id].location);
  }

  // Returns an Item by index
  function  readItemByIndex(uint index) constant public returns (address,uint,
      //generated fields
        string, string) {
    require(index < itemArray.length);
    bytes32 id = itemArray[index];
    return (itemMap[id].owner, itemMap[id].lastUpdated,
      //generated fields
            itemMap[id].name, itemMap[id].location);
  }
 // Updates Item
  function updateItem(bytes32 id,
        //generated fields
        string name, string location)
        public  returns (bool) {
    //item should exist
    require (itemMap[id].owner != address(0));
    require (itemMap[id].owner == msg.sender || contractOwner == msg.sender); //only item owner or contract owner can update

    itemMap[id].lastUpdated = now;
    //generated fields
    itemMap[id].name=name;
 itemMap[id].location=location;
    ItemUpdated(id,
        //generated fields - only param 1???
        name, location);
    return true;
  }

  // Deletes Item
  function deleteItem  (bytes32 id) public  returns (bool) {
    //item should  exist
    require (itemMap[id].owner != address(0));
    require (itemMap[id].owner == msg.sender || contractOwner == msg.sender); //only item owner or contract owner can update

    var i = itemMap[id].index;
    var lastItem = itemArray[itemArray.length-1];
    itemMap[lastItem].index = i;
    itemArray[i] = lastItem;
    itemArray.length--;


    ItemDeleted(id,
        //generated fields - only param 1???
        itemMap[id].name, itemMap[id].location );
    delete(itemMap[id]);
    return true;
  }

  // Returns itemCount
  function  countItem() constant public returns (uint) {
    return itemArray.length;
  }


  event ItemCreated(bytes32 indexed _id,
        string name, string location);
  event ItemUpdated(bytes32 indexed _id,
        string name, string location);
  event ItemDeleted(bytes32 indexed _id,
        string name, string location);

}
