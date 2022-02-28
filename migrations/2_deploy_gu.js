const BigNumber = require('bignumber.js');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Address = artifacts.require("utils/Address");
const StringHelpers = artifacts.require("utils/StringHelpers");
const Owned = artifacts.require("utils/Owned");
const Math = artifacts.require("math/Math");
const SafeMath = artifacts.require("math/SafeMath");
const Babylonian = artifacts.require("math/Babylonian");
const FixedPoint = artifacts.require("math/FixedPoint");
const ERC20 = artifacts.require("erc20/ERC20");
const ERC20Custom = artifacts.require("erc20/ERC20Custom");
const SafeERC20 = artifacts.require("erc20/SafeERC20");

// Uniswap related
const TransferHelper = artifacts.require("uniswap/TransferHelper");
const SwapToPrice = artifacts.require("uniswap/SwapToPrice");
const UniswapV2Library = artifacts.require("uniswap/UniswapV2Library");
const UniswapV2OracleLibrary = artifacts.require("uniswap/UniswapV2OracleLibrary");
const UniswapV2Router = artifacts.require("uniswap/interfaces/IUniswapV2Router02");
const UniswapV2Factory = artifacts.require("uniswap/interfaces/IUniswapV2Factory");

// Oracles
const UniswapPairOracle_GR_GUST = artifacts.require("oracle/UniswapPairOracle_Gr_GUST");
const UniswapPairOracle_GU_BUSD = artifacts.require("anchor/gu/oracle/UniswapPairOracle_Gu_BUSD");
const GrOracleWrapper = artifacts.require("oracle/GrOracleWrapper");
const GuOracleWrapper = artifacts.require("anchor/gu/oracle/GuOracleWrapper");
// Chainlink Price Consumer
const ChainlinkBNBUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkBNBUSDPriceConsumer");
const ChainlinkBUSDUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkBUSDUSDPriceConsumer");
const ChainlinkUSDTUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkUSDTUSDPriceConsumer");
const ChainlinkBNBBUSDPriceConsumer = artifacts.require("anchor/gu/oracle/ChainlinkBNBBUSDPriceConsumer");

// Governance related
const Timelock = artifacts.require("governance/Timelock");

// GU core
const GuStablecoin = artifacts.require("anchor/gu/GuStablecoin");
const GrShares = artifacts.require("gr/GrShares");

// Collateral Pools
const PoolLibrary = artifacts.require("anchor/pool/PoolLibrary");
const USDTPool = artifacts.require("anchor/pool/Pool");
const BUSDPool = artifacts.require("anchor/pool/Pool");

// Staking
const GuBUSDStaking = artifacts.require("staking/StakingRewards");
const GrGUStaking = artifacts.require("staking/StakingRewards");


// Make sure Ganache is running beforehand
module.exports = async function(deployer) {
    // // ======== Set Web3 ========
    // console.log("networks: ", networks);
    // console.log("network: ", network);
    // const { host, port } = (networks[network] || {})
    // if (!host || !port) {
    //   throw new Error(`Unable to find provider for network: ${network}`)
    // }
    // window.web3 = new Web3.providers.HttpProvider(`http://${host}:${port}`);

    // ======== Set the addresses ========
    const Contract_OWNER = "0x9Bd7FF4836524581FB662DC431Cc1ff59eEa8293"; // contract owner
    const Oracle_OWNER = "0x9Bd7FF4836524581FB662DC431Cc1ff59eEa8293"; // oracle owner
    const DevAddr = "0x9Bd7FF4836524581FB662DC431Cc1ff59eEa8293"; // pool fee

    // ======== Token Address ========
    const USDT = "0x55d398326f99059fF775485246999027B3197955";             // Bsc USDT
    const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";             // Bsc BUSD
    const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";             // Bsc WBNB
    const SwapFactory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";      // pancake factory
    const SwapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";       // pancake router

    // ======== Set other constants ========
    const COLLATERAL_SEED_DEC18 = new BigNumber("100000000e18"); // COLLATERAL ceiling

    const TIMELOCK_DELAY = 86400; // 1 days
    const DUMP_ADDRESS = "0x6666666666666666666666666666666666666666";

    // Print the addresses
    console.log(`====================================================`);

    // ======================================= Deploy most of the contracts =========================================
    await deployer.deploy(Address);
    await deployer.deploy(Babylonian);
    await deployer.deploy(StringHelpers);
    await deployer.link(Babylonian, [FixedPoint, SwapToPrice]);
    await deployer.deploy(FixedPoint);
    await deployer.link(FixedPoint, [UniswapV2OracleLibrary, UniswapPairOracle_GR_GUST, GrOracleWrapper, GuOracleWrapper, UniswapPairOracle_GU_BUSD]);
    await deployer.link(Address, [ERC20, ERC20Custom, SafeERC20]);
    await deployer.deploy(Math);
    await deployer.deploy(SafeMath);
    await deployer.link(SafeMath, [GuStablecoin, GrShares, PoolLibrary, USDTPool, BUSDPool,
        ERC20, ERC20Custom, SafeERC20, UniswapV2Library, SwapToPrice, Timelock, GuBUSDStaking, GrGUStaking]);
    await deployer.deploy(TransferHelper);
    await deployer.link(TransferHelper, [SwapToPrice, USDTPool, BUSDPool]);
    await deployer.deploy(UniswapV2OracleLibrary);
    await deployer.link(UniswapV2OracleLibrary, [UniswapPairOracle_GR_GUST, GrOracleWrapper, GuOracleWrapper, UniswapPairOracle_GU_BUSD]);
    await deployer.deploy(UniswapV2Library);
    await deployer.link(UniswapV2Library, [UniswapPairOracle_GR_GUST, GrOracleWrapper, GuOracleWrapper, UniswapPairOracle_GU_BUSD, SwapToPrice]);
    await deployer.deploy(SafeERC20);
    await deployer.link(SafeERC20, [GuStablecoin, GrShares, GrShares, USDTPool, BUSDPool]);
    await deployer.deploy(PoolLibrary);
    await deployer.link(PoolLibrary, [USDTPool, BUSDPool]);
    await deployer.deploy(Owned, Contract_OWNER);
    await deployer.deploy(Timelock, Contract_OWNER, TIMELOCK_DELAY);
    const timelockInstance = await Timelock.deployed();

    // ================================================ Synth ================================================

    const guInstance = await deployProxy(GuStablecoin, ['GUPreToken', 'gup', timelockInstance.address], { deployer, initializer: 'initialize'});
    const grInstance = await deployProxy(GrShares, ['GRPreToken', 'grp', timelockInstance.address], { deployer, initializer: 'initialize' });

    // ================================================ Collateral pools ================================================

    const colUSDTPoolInstance = await deployProxy(
        USDTPool,
        [guInstance.address, grInstance.address, USDT, timelockInstance.address, '100000000000000000000'],
        { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking']}
    );

    const colBUSDPoolInstance = await deployProxy(
        BUSDPool,
        [guInstance.address, grInstance.address, BUSD, timelockInstance.address, '100000000000000000000'],
        { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking']}
    );

    // TODO 250BUSD-250GU   250GU-250GR
    // ================================================ Add Liquidity ================================================
    const routerInstance = await UniswapV2Router.at(SwapRouter);
    const busdInstance = await ERC20.at(BUSD);

    await guInstance.approve(routerInstance.address, new BigNumber(6000e18));
    await grInstance.approve(routerInstance.address, new BigNumber(6000e18));
    await busdInstance.approve(routerInstance.address, new BigNumber(6000e18));

    // Handle GUST / BUSD
    await routerInstance.addLiquidity(
        guInstance.address,
        BUSD,
        new BigNumber(250e18),
        new BigNumber(250e18),
        new BigNumber(250e18),
        new BigNumber(250e18),
        Contract_OWNER,
        new BigNumber(2525400000)
    );

    // Handle GUST / GR
    await routerInstance.addLiquidity(
        grInstance.address,
        guInstance.address,
        new BigNumber(250e18),
        new BigNumber(250e18),
        new BigNumber(250e18),
        new BigNumber(250e18),
        Contract_OWNER,
        new BigNumber(2525400000)
    );

    // ================================================ Oracles ================================================
    await deployer.deploy(UniswapPairOracle_GU_BUSD, SwapFactory, guInstance.address, BUSD, Oracle_OWNER, timelockInstance.address);
    await deployer.deploy(UniswapPairOracle_GR_GUST, SwapFactory, grInstance.address, guInstance.address, Oracle_OWNER, timelockInstance.address);
    await deployer.deploy(ChainlinkBNBUSDPriceConsumer);
    await deployer.deploy(ChainlinkBUSDUSDPriceConsumer);
    await deployer.deploy(ChainlinkUSDTUSDPriceConsumer);
    await deployer.deploy(ChainlinkBNBBUSDPriceConsumer);
    const guBUSDOracleInstance = await UniswapPairOracle_GU_BUSD.deployed();
    const grGUSTOracleInstance = await UniswapPairOracle_GR_GUST.deployed();
    const wbnbUSDLinkOracleInstance = await ChainlinkBNBUSDPriceConsumer.deployed();
    const busdUSDLinkOracleInstance = await ChainlinkBUSDUSDPriceConsumer.deployed();
    const usdtUSDLinkOracleInstance = await ChainlinkUSDTUSDPriceConsumer.deployed();
    const bnbBUSDLinkOracleInstance = await ChainlinkBNBBUSDPriceConsumer.deployed();

    // oracle wrapper
    await deployer.deploy(GuOracleWrapper, Contract_OWNER, timelockInstance.address, guBUSDOracleInstance.address, bnbBUSDLinkOracleInstance.address, guInstance.address);
    await deployer.deploy(GrOracleWrapper, Contract_OWNER, timelockInstance.address, grGUSTOracleInstance.address, guBUSDOracleInstance.address, bnbBUSDLinkOracleInstance.address, grInstance.address, guInstance.address);
    const guOracleWrapperInstance = await GuOracleWrapper.deployed();
    const grOracleWrapperInstance = await GrOracleWrapper.deployed();


    // ================================================ Init Args ================================================

    await guInstance.setRedemptionFee(5000);
    await guInstance.setMintingFee(5000);
    await guInstance.setGrAddress(grInstance.address);
    await guInstance.setBNBAnchorOracle(wbnbUSDLinkOracleInstance.address);
    await guInstance.setSynthBnbOracle(guOracleWrapperInstance.address, WBNB);
    await guInstance.setGrBnbOracle(grOracleWrapperInstance.address, WBNB);
    await guInstance.addPool(colUSDTPoolInstance.address);
    await guInstance.addPool(colBUSDPoolInstance.address);

    // await grInstance.toggleVotes();
    await grInstance.setSynthAddress(guInstance.address);

    await colUSDTPoolInstance.setDevAddr(DevAddr);
    await colUSDTPoolInstance.setChainlinkCollatAnchorOracle(usdtUSDLinkOracleInstance.address);
    await colUSDTPoolInstance.setPoolParameters(
        COLLATERAL_SEED_DEC18,
        10000,
        1,
        5000,
        5000,
        5000,
        5000
    );

    await colBUSDPoolInstance.setDevAddr(DevAddr);
    await colBUSDPoolInstance.setChainlinkCollatAnchorOracle(busdUSDLinkOracleInstance.address);
    await colBUSDPoolInstance.setPoolParameters(
        COLLATERAL_SEED_DEC18,
        10000,
        1,
        5000,
        5000,
        5000,
        5000
    );


    // ================================================ Staking ================================================
    // stake Gu-BUSD And Gr-Gu LP
    const factoryInstance = await UniswapV2Factory.at(SwapFactory);
    const guBUSDPairInstance = await factoryInstance.getPair(guInstance.address, BUSD);
    const grGustPairInstance = await factoryInstance.getPair(grInstance.address, guInstance.address);

    const guBUSDStakingInstance = await deployProxy(
        GuBUSDStaking,
        [grInstance.address, guBUSDPairInstance, guInstance.address, timelockInstance.address, 0],
        { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking', 'delegatecall']}
    );
    const grGUStakingInstance = await deployProxy(
        GrGUStaking,
        [grInstance.address, grGustPairInstance, guInstance.address, timelockInstance.address, 0],
        { deployer, initializer: 'initialize', unsafeAllow: ['external-library-linking', 'delegatecall']}
    );

    // ================================================ TransferOwnership ================================================
    await guInstance.transferOwnership(Contract_OWNER);
    await grInstance.transferOwnership(Contract_OWNER);
    await colBUSDPoolInstance.transferOwnership(Contract_OWNER);
    await colUSDTPoolInstance.transferOwnership(Contract_OWNER);
    await guBUSDStakingInstance.transferOwnership(Contract_OWNER);
    await grGUStakingInstance.transferOwnership(Contract_OWNER);

    // ================================================ Note the addresses ================================================
    let CONTRACT_ADDRESSES = {
        ganache: {
            main: {
                Gu: guInstance.address,
                GR: grInstance.address
            },
            oracles: {
                GU_BUSD: guBUSDOracleInstance.address,
                GR_GUST: grGUSTOracleInstance.address,
                GU_WBNB: guOracleWrapperInstance.address,
                GR_WBNB: grOracleWrapperInstance.address,
                BNB_USD: wbnbUSDLinkOracleInstance.address,
                BNB_BUSD: bnbBUSDLinkOracleInstance.address,
                BUSD_USD: busdUSDLinkOracleInstance.address,
                USDT_USD: usdtUSDLinkOracleInstance.address,
            },
            timelock: timelockInstance.address,
            pools: {
                USDT: colUSDTPoolInstance.address,
                BUSD: colBUSDPoolInstance.address,
            },
            staking:{
                GuBUSD: guBUSDStakingInstance.address,
                GrGU: grGUStakingInstance.address,
            },
            tmpl: {
                GuTmpl: '',
                GrTmpl: '',
                PoolTmpl: '',
                StakingTmpl: '',
            }
        }
    }

    console.log("CONTRACT_ADDRESSES: ", CONTRACT_ADDRESSES);

    console.log(`============================ Please Assigning Tokens manually ==============================`);

};