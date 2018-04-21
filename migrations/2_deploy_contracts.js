var EventContract = artifacts.require("./EventContract.sol");
var ItemContract = artifacts.require("./ItemContract.sol");
var EventParticipant = artifacts.require("./EventParticipant.sol");

module.exports = function(deployer) {
  deployer.deploy(EventContract);
  deployer.deploy(ItemContract);
  deployer.deploy(EventParticipant);
};
