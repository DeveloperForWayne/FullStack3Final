pragma solidity ^0.4.17;

contract Rent {
    address owner;
    constructor () public {
        owner = msg.sender;
    }
    address[16] public rentalCars;
    mapping (address => uint ) public balanceOf;
    
    function rent(uint carId) public returns (uint) {  
        require((carId >= 0 && carId <= 15) );
        rentalCars[carId] = msg.sender;
        return carId;
    }
    function getRentals() public view returns (address[16]) {
        return rentalCars;
    }   
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
}