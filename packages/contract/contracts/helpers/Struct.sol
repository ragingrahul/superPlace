// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
// @param root The root of the Merkle tree (returned by the JS widget).
// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
// @param x coordinates
// @param y coordinates
// @param color the color that will place
struct PlaceStruct {
  address signal;
  uint256 root;
  uint256 nullifierHash;
  uint256[8] proof;
  uint8 x;
  uint8 y;
  string color;
}
