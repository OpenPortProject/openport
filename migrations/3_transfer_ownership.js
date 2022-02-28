// migrations/3_transfer_ownership.js
const { admin } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    // Gnosis Safe Addr
    // const gnosisSafe = '0x387a13b4f582fC4Fc268a3e151d9834602Ee7267';
    // const adminAddr = '0x0a83C4ED874C7c2964e1cBeb147ade2D2e864645';

    // The owner of the ProxyAdmin can upgrade our contracts
    // await admin.transferProxyAdminOwnership(adminAddr);
};
