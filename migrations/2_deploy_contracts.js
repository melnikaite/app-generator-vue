var EventContract = artifacts.require("./EventContract.sol");
var EventParticipant = artifacts.require("./EventParticipant.sol");

module.exports = function(deployer) {
  deployer.deploy(EventContract);
  deployer.deploy(EventParticipant);
};
