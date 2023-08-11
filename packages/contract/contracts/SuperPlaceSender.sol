// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { PlaceStruct } from "./helpers/Struct.sol";
import { IInterchainGasPaymaster } from "./interfaces/IInterchainGasPaymaster.sol";
import { IMailbox } from "./interfaces/IMailbox.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

contract superPlaceSender {
    uint32 constant OptimismGoerli = 420;
    address public opGoerliRecipient; // Address of the recipient contract
    address public mailbox; // Mailbox contract in current chain
    IInterchainGasPaymaster igp; // InterchainGasPaymaster contract

    constructor(address _opGoerliRecipient, address _mailbox, address _interchainGasPaymaster) {
        opGoerliRecipient = _opGoerliRecipient;
        mailbox = _mailbox;
        igp = IInterchainGasPaymaster(_interchainGasPaymaster);
    }

    //Encodes x,y coordinate,colour and nullifierhash
    function structToBytesEncoded(PlaceStruct calldata _place) public pure returns (bytes memory)
    {
        bytes memory data = abi.encode(_place);
        return data;
    }

    function sendAndPayForMessage(PlaceStruct calldata _place) external payable {
        bytes memory encodedData=structToBytesEncoded(_place);
        bytes32 messageId = IMailbox(mailbox).dispatch(OptimismGoerli, ByteHasher.addressToBytes32(opGoerliRecipient), encodedData);
        igp.payForGas{value: msg.value}(
            messageId, // The ID of the message that was just dispatched
            OptimismGoerli, // The destination domain of the message
            10000, // 100k gas to use in the recipient's handle function
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );
    }

    function quoteGasPayment() public view returns(uint256) {
        uint256 gasQuote = igp.quoteGasPayment(OptimismGoerli, 10000);
        return gasQuote;
    }
}