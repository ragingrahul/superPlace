//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBaseWorldID {
    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                 ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to validate a root that has expired.
    error ExpiredRoot();

    /// @notice Thrown when attempting to validate a root that has yet to be added to the root
    ///         history.
    error NonExistentRoot();
}

interface IWorldIDGroups is IBaseWorldID {
    /// @notice Verifies a WorldID zero knowledge proof.
    /// @dev Note that a double-signaling check is not included here, and should be carried by the
    ///      caller.
    /// @dev It is highly recommended that the implementation is restricted to `view` if possible.
    ///
    /// @param groupId The group identifier for the group to verify a proof for.
    /// @param root The of the Merkle tree
    /// @param signalHash A keccak256 hash of the Semaphore signal
    /// @param nullifierHash The nullifier hash
    /// @param externalNullifierHash A keccak256 hash of the external nullifier
    /// @param proof The zero-knowledge proof
    ///
    /// @custom:reverts string If the `proof` is invalid.
    /// @custom:reverts NoSuchGroup If the provided `groupId` references a group that does not exist.
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external;
}