var ItemContract = artifacts.require("./ItemContract.sol");



module.exports = function(deployer) {
  deployer.deploy(ItemContract);
};
