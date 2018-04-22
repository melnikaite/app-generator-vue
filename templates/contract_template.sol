pragma solidity ^0.4.4;


contract EntitynameContract {

  address   contractOwner;
//sssss
  struct Entityname {
    //internal fields
    uint      index;
    address   owner;
    uint      lastUpdated;
    bool initialized;
    //generated fields
    _typeValueSemicolonSeparated_


  }

  mapping(bytes32 => Entityname) public entitynameMap;
  bytes32[] public entitynameArray;

  function EntitynameContract() public {
    contractOwner = msg.sender;
  }

  // Creates Entityname
  function createEntityname(bytes32 id,
        //generated fields
        _typeValueCommaSeparated_)
        public returns (bool) {

    //entityname already exists
     require (entitynameMap[id].owner == address(0));

    //create new entityname
    //internal fields
    entitynameMap[id].index = entitynameArray.length;
    entitynameArray.push(id);
    entitynameMap[id].owner = msg.sender;
    entitynameMap[id].lastUpdated = now;
    //generated fields
    _entitynameMapIdValueEqualValueSemicolonSeparated_
    EntitynameCreated(id,
        //generated fields - only param 1???
        _valueCommaSeparated_);
    return true;
  }

  // Returns an Entityname by id
  function  readEntityname(bytes32 id) constant public returns (address,uint,
      //generated fields
      _typeCommaSeparated_) {
    return (entitynameMap[id].owner, entitynameMap[id].lastUpdated,
      //generated fields
            _entitynameMapIdValueCommaSeparated_);
  }

  // Returns an Entityname by index
  function  readEntitynameByIndex(uint index) constant public returns (address,uint,
      //generated fields
        _typeCommaSeparated_) {
    require(index < entitynameArray.length);
    bytes32 id = entitynameArray[index];
    return (entitynameMap[id].owner, entitynameMap[id].lastUpdated,
      //generated fields
            _entitynameMapIdValueCommaSeparated_);
  }
 // Updates Entityname
  function updateEntityname(bytes32 id,
        //generated fields
        _typeValueCommaSeparated_)
        public  returns (bool) {
    //entityname should exist
    require (entitynameMap[id].owner != address(0));
    require (entitynameMap[id].owner == msg.sender || contractOwner == msg.sender); //only entityname owner or contract owner can update

    entitynameMap[id].lastUpdated = now;
    //generated fields
    _entitynameMapIdValueEqualValueSemicolonSeparated_
    EntitynameUpdated(id,
        //generated fields - only param 1???
        _valueCommaSeparated_);
    return true;
  }

  // Deletes Entityname
  function deleteEntityname  (bytes32 id) public  returns (bool) {
    //entityname should  exist
    require (entitynameMap[id].owner != address(0));
    require (entitynameMap[id].owner == msg.sender || contractOwner == msg.sender); //only entityname owner or contract owner can update

    var i = entitynameMap[id].index;
    var lastEntityname = entitynameArray[entitynameArray.length-1];
    entitynameMap[lastEntityname].index = i;
    entitynameArray[i] = lastEntityname;
    entitynameArray.length--;


    EntitynameDeleted(id,
        //generated fields - only param 1???
        _entitynameMapIdValueCommaSeparated_ );
    delete(entitynameMap[id]);
    return true;
  }

  // Returns entitynameCount
  function  countEntityname() constant public returns (uint) {
    return entitynameArray.length;
  }


  event EntitynameCreated(bytes32 indexed _id,
        _typeValueCommaSeparated_);
  event EntitynameUpdated(bytes32 indexed _id,
        _typeValueCommaSeparated_);
  event EntitynameDeleted(bytes32 indexed _id,
        _typeValueCommaSeparated_);

}
