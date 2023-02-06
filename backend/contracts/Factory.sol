// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IpfsProfile.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NoProfile();

contract Factory is Ownable {
    address private immutable ipfsProfileImplementation;
    mapping(address => address) private profileContracts; // owner -> subscription contract

    event CreateProfile(address cloneAddress, address ownedBy);

    constructor() {
        ipfsProfileImplementation = address(new IpfsProfile());
    }




        function createProfileContract() external {
        address clone = Clones.clone(ipfsProfileImplementation);
        IpfsProfile(payable(clone)).initialize();
        IpfsProfile(payable(clone)).transferOwnership(msg.sender);
        profileContracts[msg.sender] = clone;
        emit CreateProfile(clone, msg.sender);
    }

    // To see if subsdciption contract is already created or not
    function isCreated() public view returns (bool _isCreated) {
        _isCreated = (getProfileOwner(payable(profileContracts[msg.sender])) != address(0));
    }


    function getProfileContract() public view returns (address _profileContract) {
        _profileContract = profileContracts[msg.sender];
    }

    function getProfileOwner(address payable _profileContract) public view returns (address _owner) {
        _owner = IpfsProfile(_profileContract).owner();
    }
    

}
