pragma solidity ^0.4.17;
import "../contracts/CarRentalToken.sol";

contract Return {
    address owner;
    constructor () public {
        owner = msg.sender;
    }
    address[16] public rentalCars;
    
    function returnCar(uint carId) public returns (bool) {  
        require(carId >= 0 && carId <= 15 );
        rentalCars[carId] = address(0);
        return true;
    }
}