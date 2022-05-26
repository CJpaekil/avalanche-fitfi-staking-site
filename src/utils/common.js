import { web3FitfiPoolInterface } from "../web3/Hook";
import Web3 from "web3";
export const UserRewardAmount = async (account) => {
    const MAX_LOCK_DURATION = await web3FitfiPoolInterface().methods.MAX_LOCK_DURATION().call();
    const MAX_TEN_APY = await web3FitfiPoolInterface().methods.MAX_TEN_APY().call();
    const MAX_TEN_PERIOD = await web3FitfiPoolInterface().methods.MAX_TEN_PERIOD().call();
    const userInfo = await web3FitfiPoolInterface().methods.userInfo(account).call();
    const nowDate = new Date();

    let lockedDuration = 0;
    if (userInfo.lockStartTime !== "0" && (nowDate.getTime() / 1000 - userInfo.lockStartTime) >= MAX_TEN_PERIOD) {
        lockedDuration = nowDate.getTime() / 1000 - userInfo.lastUserActionTime;
    }
    const etherValue = Web3.utils.fromWei(userInfo.rewardAmount)
        + Web3.utils.fromWei(userInfo.depositAmount) * MAX_TEN_APY / (100 * MAX_LOCK_DURATION) * lockedDuration;
    // console.log("userRewardAmountWei", Math.floor(etherValue));    

    return Math.floor(etherValue);
}

export const PassedLockTime = async (account) => {
    const MAX_TEN_PERIOD = await web3FitfiPoolInterface().methods.MAX_TEN_PERIOD().call();
    const userInfo = await web3FitfiPoolInterface().methods.userInfo(account).call();
    const nowDate = new Date();
    if (userInfo.lockStartTime !== "0" && (nowDate.getTime() / 1000 - userInfo.lockStartTime) >= MAX_TEN_PERIOD) {
        return true;
    } else {
        return false;
    }
}
