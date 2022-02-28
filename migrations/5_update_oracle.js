const BigNumber = require('bignumber.js');

const UniswapPairOracle_GR_GUST = artifacts.require("oracle/UniswapPairOracle_Gr_GUST");
const UniswapPairOracle_GU_BUSD = artifacts.require("anchor/gu/oracle/UniswapPairOracle_Gu_BUSD");
const UniswapPairOracle_USDT_WBNB = artifacts.require("oracle/UniswapPairOracle_USDT_WBNB");
const UniswapPairOracle_BUSD_WBNB = artifacts.require("oracle/UniswapPairOracle_BUSD_WBNB");
const BUSDPool = artifacts.require("anchor/pool/Pool");
const ERC20 = artifacts.require("erc20/ERC20");

module.exports = async function (deployer) {
    // const guBUSDOracleInstance = await UniswapPairOracle_GU_BUSD.deployed();
    // const grGUSTOracleInstance = await UniswapPairOracle_GR_GUST.deployed();
    // const usdtWBNBOracleInstance = await UniswapPairOracle_USDT_WBNB.deployed();
    // const busdWBNBOracleInstance = await UniswapPairOracle_BUSD_WBNB.deployed();
    //
    // await guBUSDOracleInstance.update();
    // await grGUSTOracleInstance.update();
    // await usdtWBNBOracleInstance.update();
    // await busdWBNBOracleInstance.update();

    // ================================================  RecollateralizeSynth ================================================
    // console.log("再抵押")
    // const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";             // Bsc BUSD
    // const BUSDPoolAddr = "0x6BB4220DC6F05e72fb7E13fa49B97C759039Ccaa";             // BUSD Pool
    // const busdInstance = await ERC20.at(BUSD);
    // const colBUSDPoolInstance = await BUSDPool.at(BUSDPoolAddr);
    //
    // await busdInstance.approve(colBUSDPoolInstance.address, new BigNumber(600e18));
    // await colBUSDPoolInstance.recollateralizeSynth(new BigNumber(600e18), new BigNumber(0));
};