const CHAIN_CONFIG: any = {
  AMOY: {
    lzEndpointOnCurrentChain: "0x6EDCE65403992e310A62460808c4b910D972f10f",
    lzEndpointIdOnCurrentChain: 40267,

    // https://docs.layerzero.network/v2/developers/evm/technical-reference/dvn-addresses#layerzero-labs
    requiredDVNsOnCurrentChain: [
      "0x55c175dd5b039331db251424538169d8495c18d1", // LayerZero Labs
    ],
    optionalDVNsOnCurrentChain: [], // if specifying optional DVN, the setConfig tx will get reverted, why?

    // From the deployed endpoint, take the SendLib302 and ReceiveLib302
    // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts
    sendLibAddressOnCurrentChain: "0x1d186C560281B8F1AF831957ED5047fD3AB902F9",
    receiveLibAddressOnCurrentChain: "0x53fd4C4fBBd53F6bC58CaE6704b92dB1f360A648",

    confirmationsOnCurrentChain: 0, // will get default confirmations
  },

  SEPOLIA: {
    lzEndpointOnCurrentChain: "0x6EDCE65403992e310A62460808c4b910D972f10f",
    lzEndpointIdOnCurrentChain: 40161,

    // https://docs.layerzero.network/v2/developers/evm/technical-reference/dvn-addresses#layerzero-labs
    requiredDVNsOnCurrentChain: [
      "0x8eebf8b423b73bfca51a1db4b7354aa0bfca9193", // LayerZero Labs
    ],
    optionalDVNsOnCurrentChain: [], // if specifying optional DVN, the setConfig tx will get reverted, why?

    // From the deployed endpoint, take the SendLib302 and ReceiveLib302
    // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts
    sendLibAddressOnCurrentChain: "0xcc1ae8Cf5D3904Cef3360A9532B477529b177cCE",
    receiveLibAddressOnCurrentChain: "0xdAf00F5eE2158dD58E0d3857851c432E34A3A851",

    confirmationsOnCurrentChain: 0, // will get default confirmations
  },
};

const PATHWAY_CONFIG = (srcChain: string, destChain: string) => {
  if (!CHAIN_CONFIG[srcChain]) {
    throw new Error(`Chain config for ${srcChain} missing`);
  } else if (!CHAIN_CONFIG[destChain]) {
    throw new Error(`Chain config for ${destChain} missing`);
  }

  return {
    ...CHAIN_CONFIG[srcChain],

    lzEndpointIdOnRemoteChain: CHAIN_CONFIG[destChain].lzEndpointIdOnCurrentChain,
  };
};

export default PATHWAY_CONFIG;
