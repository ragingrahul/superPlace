// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract SuperPlace {
    mapping(uint256 => mapping(uint256 => bool)) internal haveDrawn;
    uint8[100][200] public canvas;
    uint256 public currentRound;
    // mapping(uint8 => mapping(uint8 => uint256[])) drawList;

    using ByteHasher for bytes;

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function draw(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        uint8 x,
        uint8 y,
        uint8 color
    ) public {
        // TODO if user input user => they can fake address
        // TODO should verify x,y,color

        // https://community.optimism.io/docs/developers/build/differences/#transaction-costs
        // block in time = 2s => 90 block = 1 round
        uint256 _currentRound = block.number / 90;

        if (currentRound != _currentRound) {
            currentRound = _currentRound;
        }

        // First, we make sure this person hasn't done this before
        if (haveDrawn[nullifierHash][currentRound]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        haveDrawn[nullifierHash][currentRound] = true;

        canvas[x][y] = color;
    }

    function getCurrentBlockInfo() public view returns (uint, uint) {
        uint currentBlockNumber = block.number;
        uint currentTimestamp = block.timestamp;
        return (currentBlockNumber, currentTimestamp);
    }
}
