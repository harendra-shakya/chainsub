// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./ChainSub.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    address private immutable chainSubImplementation;
    mapping(address => address) private subscriptionContracts; // owner -> subscription contract
    IEncryptionOracle public oracle;

    event CreateSubscription(address cloneAddress, address ownedBy);

    constructor(IEncryptionOracle _oracle) {
        oracle = _oracle;
        chainSubImplementation = address(new ChainSub());
    }

    function createSubscriptionContract(
        uint tier1Price,
        uint tier2Price,
        uint tier3Price,
        address oracle
    ) external {
        address clone = Clones.clone(chainSubImplementation);
        ChainSub(payable(clone)).initialize(tier1Price, tier2Price, tier3Price);
        ChainSub(payable(clone)).transferOwnership(msg.sender);
        subscriptionContracts[msg.sender] = clone;
        emit CreateSubscription(clone, msg.sender);
    }

    // To see if subsdciption contract is already created or not
    function isCreated() public view returns (bool _isCreated) {
        _isCreated = (subscriptionContracts[msg.sender] != address(0));
    }

    function getSubscriptionContract() public view returns (address _subscriptionContract) {
        _subscriptionContract = subscriptionContracts[msg.sender];
    }
}
