// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldIDGroups } from "./interfaces/IWorldIDGroups.sol";
import { PlaceStruct } from "./helpers/Struct.sol";

contract SuperPlace {
    mapping(uint256 => mapping(uint256 => bool)) internal havePlace;
    string[200][100] public canvas;
    uint256 public currentRound;

    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldIDGroups internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 public externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    // mailbox contract https://docs.hyperlane.xyz/docs/resources/addresses
    address public mailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;

    // Event
    event Received(uint32 origin, address sender, bytes body);
    event Placed(address user, uint256 x, uint256 y, string color);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(
        IWorldIDGroups _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    function place(PlaceStruct calldata _place) public {
        _internalPlace(_place);
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _body
    ) public onlyMailbox{
        address sender = ByteHasher.bytes32ToAddress(_sender);
        emit Received(_origin, sender, _body);
        PlaceStruct memory _place = abi.decode(_body,(PlaceStruct));
        _internalPlace(_place);
    }

    function _internalPlace(PlaceStruct memory _place) internal {
        // TODO should verify x,y,color

        // each round is 3 minutes
        if (currentRound + 180 < block.timestamp) {
            currentRound = block.timestamp;
        }

        // First, we make sure this person hasn't done this before
        if (havePlace[_place.nullifierHash][currentRound]) revert InvalidNullifier();
        uint256 signalHash = abi.encodePacked(_place.signal).hashToField();
        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            _place.root,
            groupId,
            signalHash,
            _place.nullifierHash,
            externalNullifier,
            _place.proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        havePlace[_place.nullifierHash][currentRound] = true;

        canvas[_place.x][_place.y] = _place.color;
        emit Placed(_place.signal, _place.x, _place.y, _place.color);
    }

    function getCurrentBlockInfo() public view returns (uint, uint) {
        uint currentBlockNumber = block.number;
        uint currentTimestamp = block.timestamp;
        return (currentBlockNumber, currentTimestamp);
    }

    function getCanvas(uint8 x) public view returns (string[200] memory) {
        return canvas[x];
    }
}
