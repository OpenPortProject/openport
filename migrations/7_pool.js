const BigNumber = require('bignumber.js');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const SafeMath = artifacts.require("math/SafeMath");
const TransferHelper = artifacts.require("uniswap/TransferHelper");
const SafeERC20 = artifacts.require("erc20/SafeERC20");
const Timelock = artifacts.require("governance/Timelock");
const GuStablecoin = artifacts.require("anchor/gu/GuStablecoin");
const GrShares = artifacts.require("gr/GrShares");
const ChainlinkBUSDUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkBUSDUSDPriceConsumer");
const ChainlinkUSDTUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkUSDTUSDPriceConsumer");
const PoolLibrary = artifacts.require("anchor/pool/PoolLibrary");
const USDTPool = artifacts.require("anchor/pool/Pool");
const BUSDPool = artifacts.require("anchor/pool/Pool");

module.exports = async function (deployer) {

    // const guToken = "0x4a5cFCB5749bB51cF19Da92E5D48713F8806C1C1";
    // const grToken = "0xdA2F977A0dD4b28749f357f36F5E183c9927Baf9";
    // const USDT = "0x55d398326f99059fF775485246999027B3197955";             // Bsc USDT
    // const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";             // Bsc BUSD
    // const timelock = "0x311f3410d9Fd97B80F161Dc2FC2A2Ee2CcC3D0c3"
    // const DevAddr = "0x9Bd7FF4836524581FB662DC431Cc1ff59eEa8293"; // pool fee
    // const COLLATERAL_SEED_DEC18 = new BigNumber("100000000e18"); // COLLATERAL ceiling
    //
    // await deployer.deploy(SafeMath);
    // await deployer.link(SafeMath, [PoolLibrary, USDTPool, BUSDPool]);
    // await deployer.deploy(TransferHelper);
    // await deployer.link(TransferHelper, [USDTPool, BUSDPool]);
    // await deployer.deploy(SafeERC20);
    // await deployer.link(SafeERC20, [USDTPool, BUSDPool]);
    // await deployer.deploy(PoolLibrary);
    // await deployer.link(PoolLibrary, [USDTPool, BUSDPool]);
    //
    // const guInstance = await GuStablecoin.at(guToken);
    // const grInstance = await GrShares.at(grToken);
    // const timelockInstance = await Timelock.at(timelock);
    //
    // await guInstance.removePool("0xD90b434FBeE8f455C4e6B9349BCD9081c07FB36B");
    // await guInstance.removePool("0x6BB4220DC6F05e72fb7E13fa49B97C759039Ccaa");
    //
    // const colUSDTPoolInstance = await deployProxy(
    //     USDTPool,
    //     [guInstance.address, grInstance.address, USDT, timelockInstance.address, '100000000000000000000'],
    //     { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking']}
    // );
    //
    // const colBUSDPoolInstance = await deployProxy(
    //     BUSDPool,
    //     [guInstance.address, grInstance.address, BUSD, timelockInstance.address, '100000000000000000000'],
    //     { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking']}
    // );
    //
    // console.log("colUSDTPool: ", colUSDTPoolInstance.address);
    // console.log("colBUSDPool: ", colBUSDPoolInstance.address);
    //
    // await deployer.deploy(ChainlinkBUSDUSDPriceConsumer);
    // await deployer.deploy(ChainlinkUSDTUSDPriceConsumer);
    // const busdUSDLinkOracleInstance = await ChainlinkBUSDUSDPriceConsumer.deployed();
    // const usdtUSDLinkOracleInstance = await ChainlinkUSDTUSDPriceConsumer.deployed();
    // console.log("busd usd link oracle: ", busdUSDLinkOracleInstance.address);
    // console.log("usdt usd link oracle: ", usdtUSDLinkOracleInstance.address);
    //
    //
    // await guInstance.addPool(colUSDTPoolInstance.address);
    // await guInstance.addPool(colBUSDPoolInstance.address);
    //
    // await colUSDTPoolInstance.setDevAddr(DevAddr);
    // await colUSDTPoolInstance.setChainlinkCollatAnchorOracle(usdtUSDLinkOracleInstance.address);
    // await colUSDTPoolInstance.setPoolParameters(
    //     COLLATERAL_SEED_DEC18,
    //     10000,
    //     1,
    //     5000,
    //     5000,
    //     5000,
    //     5000
    // );
    //
    // await colBUSDPoolInstance.setDevAddr(DevAddr);
    // await colBUSDPoolInstance.setChainlinkCollatAnchorOracle(busdUSDLinkOracleInstance.address);
    // await colBUSDPoolInstance.setPoolParameters(
    //     COLLATERAL_SEED_DEC18,
    //     10000,
    //     1,
    //     5000,
    //     5000,
    //     5000,
    //     5000
    // );
};