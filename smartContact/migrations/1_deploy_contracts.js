const HouseTypeManager = artifacts.require("HouseTypeManager");

module.exports = function (deployer) {
  deployer.deploy(HouseTypeManager);
};