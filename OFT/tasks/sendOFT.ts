import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
// import SwapMock from '../deployments/arbsep/SwapMock.json'
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from "@layerzerolabs/lz-definitions";
// import { SendParam } from "./typeDefinitions";

// Assuming you are using ethers.js in your Hardhat project
import { BigNumberish, BytesLike } from "ethers"
/**
 * Represents token parameters for the OFT send() operation.
 */
export interface SendParam {
    dstEid: BigNumberish; // Destination endpoint ID, represented as a number.
    to: BytesLike; // Recipient address, represented as bytes.
    amountLD: BigNumberish; // Amount to send in local decimals.
    minAmountLD: BigNumberish; // Minimum amount to send in local decimals.
    extraOptions: BytesLike; // Additional options supplied by the caller to be used in the LayerZero message.
    composeMsg: BytesLike; // The composed message for the send() operation.
    oftCmd: BytesLike; // The OFT command to be executed, unused in default OFT implementations.
}
/**
 * Represents the messaging fee structure returned by the quoteSend function.
 */
export interface MessagingFee {
    nativeFee: BigNumberish; // The native fee.
    lzTokenFee: BigNumberish; // The lzToken fee.
}

task("send", "Calls the send function on the MyOFT contract with encoded send parameters")
    .addParam("contract", "The address of the MyOFT contract")
    .addParam("amount", "The amount of MyOFT to send")
    .addParam("recipient", "The recipient address")
    .setAction(async (taskArgs: TaskArguments, { ethers }) => {
        const MyOFT = await ethers.getContractFactory("MyOFT");
        const myOFT = MyOFT.attach(taskArgs.contract);

        // Encoding the uint256 amount and address for the compose message
        const amountToSwap = ethers.utils.parseEther(taskArgs.amount).toBigInt();

        const sendParam: SendParam = {
            dstEid: EndpointId.AMOY_V2_TESTNET,
            to: ethers.utils.hexZeroPad(taskArgs.recipient, 32),
            amountLD: amountToSwap,
            minAmountLD: amountToSwap,
            extraOptions: Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString(),
            composeMsg: ethers.utils.arrayify('0x'), // Assuming no composed message
            oftCmd: ethers.utils.arrayify('0x') // Assuming no OFT command is needed
        };

        // Get the quote for the send operation
        const feeQuote = await myOFT.quoteSend(sendParam, false);
        const nativeFee = feeQuote.nativeFee;

        // Sending the transaction
        const tx = await myOFT.send(
            sendParam,
            { nativeFee: nativeFee, lzTokenFee: 0 },
            taskArgs.recipient, // _refundAddress
            { value: nativeFee } // Adjust the ETH value as required for the transaction
        );

        console.log("Transaction Hash:", tx.hash);
        await tx.wait();
        console.log("Send transaction completed.");
    });

export default 'sendOFT';