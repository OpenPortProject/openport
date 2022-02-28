// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../../../oracle/UniswapPairOracle.sol";

// Fixed window oracle that recomputes the average price for the entire period once every period
// Note that the price average is only guaranteed to be over at least 1 period, but may be over a longer period
contract UniswapPairOracle_Gu_BUSD is UniswapPairOracle {
    constructor (address factory, address tokenA, address tokenB, address owner_address, address timelock_address) public
    UniswapPairOracle(factory, tokenA, tokenB, owner_address, timelock_address) 
    {}
}