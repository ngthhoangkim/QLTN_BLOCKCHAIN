const RentalListing = artifacts.require("RentalListing");

module.exports = function (deployer) {
  deployer.deploy(RentalListing);
};
