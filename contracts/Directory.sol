pragma solidity ^0.4.17;

contract Directory {

    address private owner;
    mapping (address => bool) public Doctors;

    modifier onlyOwner() {
        require( msg.sender==owner, "Only owner can add Doctors"); 
        _;  
    }

    event LogDoctor(string _message);

    constructor(){
        owner = msg.sender;
    }

    function addDoctor(address _doctor) public onlyOwner{
        Doctors[_doctor] = true;
        emit LogDoctor("Doctor Added.");
    }

    function removeDoctor(address _doctor) public onlyOwner{
        Doctors[_doctor] = false;
        emit LogDoctor("Doctor Removed.");
    }
}
