var EventParticipant = artifacts.require("./EventParticipant.sol");

module.exports = function(deployer) {
  deployer.deploy(EventParticipant);
};
