// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFT } from "@layerzerolabs/oft-evm/contracts/OFT.sol";

contract MyOFT is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) Ownable(_delegate) {
        _mint(msg.sender, 100 ether);
    }
}
//Amoy Testnet OFT - 0xe7F5E7d374E08d30Be91C3470cBDbec803884B61
//Sepolia Testnet OFT - 0x844EF7d1F53f10954da3Ff356438746eadc7F95C