const BigNumber = require('bignumber.js');

const GuBUSDStaking = artifacts.require("staking/StakingRewards");
const GrGUStaking = artifacts.require("staking/StakingRewards");
const ERC20 = artifacts.require("erc20/ERC20");

module.exports = async function (deployer) {
    // const guBusd = "0xf34008ce73441728414F2749ea6C3Ec1B5942FB1"
    // const grGu = "0x38FCC1aF29f9D5C851BEa9E3412BD07e9C6298d3"
    // const grToken = "0xdA2F977A0dD4b28749f357f36F5E183c9927Baf9";
    //
    // console.log("Staking")
    // const colGuBUSDPoolInstance = await GuBUSDStaking.at(guBusd);
    // const colGrGuPoolInstance = await GrGUStaking.at(grGu);
    //
    // console.log("initializeDefault")
    // await colGuBUSDPoolInstance.initializeDefault();
    // await colGrGuPoolInstance.initializeDefault();
    //
    // console.log("setRewardRate")
    // await colGuBUSDPoolInstance.setRewardRate(new BigNumber(1e18));
    // await colGrGuPoolInstance.setRewardRate(new BigNumber(1e18));
    //
    // console.log("transfer gr")
    // const grInstance = await ERC20.at(grToken);
    // grInstance.transfer(guBusd, new BigNumber(1000000e18))
    // grInstance.transfer(grGu, new BigNumber(1000000e18))
};