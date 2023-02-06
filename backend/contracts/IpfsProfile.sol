// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

//add reentrancy guard

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract IpfsProfile is OwnableUpgradeable, ReentrancyGuardUpgradeable {

    event Received(address, uint);
    event CoffeeBought(address);
    event Received(uint);

    mapping (address => string) public addressToCid;

    //constructor
     function initialize() public initializer {
        __Ownable_init();
    }
    

    //add a CID to the contract

    function addCID(string memory cidraw) public onlyOwner {
        //set the cidToAddress mapping to the address of the owner
        addressToCid[msg.sender] = cidraw;
    }

    function updateCID(string memory new_cidraw) public onlyOwner {
        addressToCid[msg.sender] = new_cidraw;
    }


    //get the CID
    function getCID() public view returns (string memory) {
        string memory profileCid= addressToCid[msg.sender] ;
        return profileCid;
    }

        function fundme() public payable {
        emit Received(msg.value);
    }

    receive() external payable  { 
        fundme();
    }

    fallback() external payable {
        fundme();
    }

    //add a withdraw function
    function withdraw() public onlyOwner nonReentrant() {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function buyCoffee() public payable {
        require(msg.value >= 0.01 ether, "Not enough!");
        //send 0.01 ETH to the owner
        payable(owner()).transfer((0.01 ether));
        emit CoffeeBought(msg.sender);
    }




}