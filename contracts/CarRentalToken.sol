pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract CarRentalToken is ERC20 {
    //Defining our native token
    string public name = "CarRentalToken";
    string public symbol = "CRT";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 12000;
    constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
    }
}