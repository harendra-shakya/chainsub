pragma solidity 0.8.17;
//SPDX-License-Identifier: MIT

//errors
//minimum subscription tier is 1
//make a revert error instead of require

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PullPayment} from "@openzeppelin/contracts/security/PullPayment.sol";

error NoEtherSent(uint256 value, uint256 min);

error CallbackNotAuthorized();
error ListingDoesNotExist();
error InsufficentFunds();
error NotSubscribed();


    struct G1Point {
    uint256 x;
    uint256 y;
}

struct DleqProof {
    uint256 f;
    uint256 e;
}

/// @notice A 32-byte encrypted ciphertext
struct Ciphertext {
    G1Point random;
    uint256 cipher;
    /// DLEQ part
    G1Point random2;
    DleqProof dleq;
}

interface IEncryptionClient {
    /// @notice Callback to client contract when medusa posts a result
    /// @dev Implement in client contracts of medusa
    /// @param requestId The id of the original request
    /// @param _cipher the reencryption result
    function oracleResult(uint256 requestId, Ciphertext calldata _cipher) external;
}

interface IEncryptionOracle {
    /// @notice submit a ciphertext that can be retrieved at the given link and
    /// has been created by this encryptor address. The ciphertext proof is checked
    /// and if correct, being signalled to Medusa.
    function submitCiphertext(Ciphertext calldata _cipher, address _encryptor)
        external
        returns (uint256);

    /// @notice Request reencryption of a cipher text for a user
    /// @dev msg.sender must be The "owner" or submitter of the ciphertext or the oracle will not reply
    /// @param _cipherId the id of the ciphertext to reencrypt
    /// @return the reencryption request id
    function requestReencryption(uint256 _cipherId, G1Point calldata _publickey) external returns (uint256);

    function distributedKey() external view virtual returns (G1Point memory);
}



contract ChainSub is OwnableUpgradeable, IEncryptionClient, PullPayment {
    struct Subscription {
        uint256 tier;
        uint256 expiration;
    }

    mapping(address => Subscription) public subscriptions;

    IEncryptionOracle public oracle = IEncryptionOracle(0xd466A3C66ad402Aa296ab7544bcE90BBE298F6A0);

    uint256 min;

    //create a variable for the medusa oracle address called oracle, the address is 0xd466A3C66ad402Aa296ab7544bcE90BBE298F6A0
    
    uint256 public tier1Price;
    uint256 public tier2Price;
    uint256 public tier3Price;

    uint256 public tier1Duration = 30 days;
    uint256 public tier2Duration = 30 days;
    uint256 public tier3Duration = 30 days;

    function initialize(uint _tier1Price, uint _tier2Price, uint _tier3Price, IEncryptionOracle _oracle) external initializer {
        __Ownable_init();

        oracle = _oracle;
        min = _tier3Price;
        tier1Price = _tier1Price;
        tier2Price = _tier2Price;
        tier3Price = _tier3Price;
    }

    event ListingDecryption(uint256 indexed requestId, Ciphertext ciphertext);
    event NewListing(
        address indexed seller, uint256 indexed cipherId, string name, string description, string uri
    );

        modifier onlyOracle() {
        if (msg.sender != address(oracle)) {
            revert CallbackNotAuthorized();
        }
        _;
    }

        modifier IsSubcribed() {
        if (isSubscribed(msg.sender) == false) {
            revert NotSubscribed();
        }
        _;
    }


        /// @notice Create a new listing
    /// @dev Submits a ciphertext to the oracle, stores a listing, and emits an event
    /// @return cipherId The id of the ciphertext associated with the new listing
    function submitEntry(
        Ciphertext calldata cipher
    ) external returns (uint256) {
        uint256 cipherId = IEncryptionOracle(0xd466A3C66ad402Aa296ab7544bcE90BBE298F6A0).submitCiphertext(cipher, msg.sender);
        return cipherId;
    }

    function subscribe(uint256 _tier) public payable {
        require(_tier == 1 || _tier == 2 || _tier == 3, "Invalid tier");
        require(    
            (msg.value == tier1Price && _tier == 1) ||
                (msg.value == tier2Price && _tier == 2) ||
                (msg.value == tier3Price && _tier == 3),
            "Invalid price"
        );

        subscriptions[msg.sender] = Subscription(
            _tier,
            block.timestamp +
                (_tier == 1 ? tier1Duration : _tier == 2 ? tier2Duration : tier3Duration)
        );
    }

        /// @inheritdoc IEncryptionClient
    function oracleResult(uint256 requestId, Ciphertext calldata cipher) external onlyOracle IsSubcribed {
        emit ListingDecryption(requestId, cipher);
    }

        /// @notice Convenience function to get the public key of the oracle
    /// @dev This is the public key that sellers should use to encrypt their listing ciphertext
    /// @dev Note: This feels like a nice abstraction, but it's not strictly necessary
    function publicKey() external view returns (G1Point memory _publicKey) {
        return IEncryptionOracle(0xd466A3C66ad402Aa296ab7544bcE90BBE298F6A0).distributedKey();
    }



    //payable receive function that will allow the user to pay the subscription fee and will give them the subscription tier they paid for
    //reverts if not enough ether sent, returns any extra ether sent
    receive() external payable {
        require(msg.value > 0, "No ether sent");
        if (msg.value >= tier3Price) {
            subscriptions[msg.sender] = Subscription(3, block.timestamp + (tier3Duration));
            payable(msg.sender).transfer(msg.value - (tier3Price));
        } else if (msg.value >= tier2Price) {
            subscriptions[msg.sender] = Subscription(2, block.timestamp + (tier2Duration));
            payable(msg.sender).transfer(msg.value - (tier2Price));
        } else if (msg.value >= tier1Price) {
            subscriptions[msg.sender] = Subscription(3, block.timestamp + (tier1Duration));
            payable(msg.sender).transfer(msg.value - (tier1Price));
        } else {
            revert NoEtherSent(msg.value, min);
        }
    }

    function isSubscribed(address _user) public view returns (bool) {
        return subscriptions[_user].expiration > block.timestamp;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function setTier1Price(uint256 _price) public onlyOwner {
        tier1Price = _price;
    }

    function setTier2Price(uint256 _price) public onlyOwner {
        tier2Price = _price;
    }

    function setTier3Price(uint256 _price) public onlyOwner {
        tier3Price = _price;
    }

    function setTier1Duration(uint256 _duration) public onlyOwner {
        tier1Duration = _duration;
    }

    function setTier2Duration(uint256 _duration) public onlyOwner {
        tier2Duration = _duration;
    }

    function setTier3Duration(uint256 _duration) public onlyOwner {
        tier3Duration = _duration;
    }
}
