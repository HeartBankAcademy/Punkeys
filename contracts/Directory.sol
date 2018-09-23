pragma solidity ^0.4.17;
import "./Oraclize.sol";

contract Directory is usingOraclize{

    address private owner;
    mapping (address => bool) public Doctors;

    modifier onlyOwner() {
        require( msg.sender==owner, "Only owner can add Doctors"); 
        _;  
    }

    event LogMessage(string _message);
    event LogNewOraclizeQuery(string description);

    constructor(){
        owner = msg.sender;
    }

    function addDoctor(address _doctor) public onlyOwner{
        Doctors[_doctor] = true;
        LogMessage("Doctor Added.");
    }

    function removeDoctor(address _doctor) public onlyOwner{
        Doctors[_doctor] = false;
        LogMessage("Doctor Removed.");
    }

    function __callback(bytes32 myid, string result) {
        
    }

    function addRecord(string _url) public payable {
        LogMessage("Doctor Removed.");
        if (oraclize_getPrice("URL") > this.balance) {
            LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query("URL", _url);
        }
    }
}
