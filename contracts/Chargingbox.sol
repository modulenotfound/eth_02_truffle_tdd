pragma solidity ^0.4.18;

contract Chargingbox {
    uint256 rate = 0.001 ether;
    uint256 minimum = 0.001 ether;

    address public owner;
    address public renter;
    uint256 public endTimestamp = 0;

    event Rented(address indexed _from, uint256 _value);

    constructor() public {
        owner = msg.sender;
    }

    function rent() public payable {
        require(msg.value >= minimum);

        require (now > endTimestamp);

        endTimestamp = now + (msg.value / rate) * 60;

        renter = msg.sender;
        emit Rented(msg.sender, msg.value);
    }
}