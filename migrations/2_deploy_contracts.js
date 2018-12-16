var Rent = artifacts.require("./Rent.sol");
var Return = artifacts.require("./Return.sol");
var CarRentalToken = artifacts.require("./CarRentalToken.sol");

module.exports = function(deployer) {
    deployer.deploy(Rent);
    deployer.deploy(Return);
    deployer.deploy(CarRentalToken);
};