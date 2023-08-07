// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SuperPlace {
    mapping(address => mapping(uint256 => bool)) haveDrawn;
    uint8[100][200] public canvas;
    uint256 public currentRound;
    // mapping(uint8 => mapping(uint8 => uint256[])) drawList;

    function draw(address user, uint8 x, uint8 y, uint8 color) public {
        // TODO if user input user => they can fake address
        // TODO should verify x,y,color
        // https://community.optimism.io/docs/developers/build/differences/#transaction-costs
        // block in time = 2s => 90 block = 1 round
        uint256 _currentRound = block.number / 90;
        if (currentRound != _currentRound){
            // new round
            // i want the first person will trigger random value for peoples who draw same position
            canvas[x][y] = color;
            currentRound = _currentRound;
        } else {
            require(haveDrawn[user][currentRound], "You can only draw once in round");
            canvas[x][y] = color;

            haveDrawn[user][currentRound] = true;
        }
    }

    function getCurrentBlockInfo() public view returns (uint, uint) {
        uint currentBlockNumber = block.number;
        uint currentTimestamp = block.timestamp;
        return (currentBlockNumber, currentTimestamp);
    }
}
