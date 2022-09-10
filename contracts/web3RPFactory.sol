// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./esgReward.sol";
import "./web3RPCore.sol";

contract Web3RPFactory {

    event ERPDeployed(address indexed owner, address erp);

    ESGReward public rewardToken;

    constructor () {
        rewardToken = new ESGReward();
    }

    function deployERP() external {
        Web3RPCore erp = new Web3RPCore();
        emit ERPDeployed(msg.sender, address(erp));
    }

    function mintReward(address to, bytes32[] calldata vouchers) external{
        uint256 voucherLength = vouchers.length;
        for (uint256 i=0; i<voucherLength; i++ ){
            require(vouchers[i] == "0x0000000000000000000000000000000000000000000000000000000000000000", "Vouchers should be valid");
        }
        rewardToken(to, vouchers.length**18);
    }

}