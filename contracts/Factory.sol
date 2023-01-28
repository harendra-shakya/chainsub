// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./ChainSub.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    address private immutable chainSubImplementation;

    event CreateSubscription(address cloneAddress, address ownedBy);

    constructor() {
        chainSubImplementation = address(new ChainSub());
    }

    function createSubscriptionContract(
        uint tier1Price,
        uint tier2Price,
        uint tier3Price
    ) external {
        address clone = Clones.clone(chainSubImplementation);
        ChainSub(payable(clone)).initialize(tier1Price, tier2Price, tier3Price);
        ChainSub(payable(clone)).transferOwnership(msg.sender);
        emit CreateSubscription(clone, msg.sender);
    }
}
