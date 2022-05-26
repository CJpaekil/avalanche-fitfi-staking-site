import { Link } from "react-router-dom";
import { web3FitfiPoolInterface } from "../../web3/Hook";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { UserRewardAmount } from "../../utils/common";
const Rules = () => {
    const { account, chainId } = useWeb3React();

    const onClaim = async () => {
        if (!account) {
            toast.error("Connect your wallet");
            return;
        }

        if (chainId != 43113) {
            toast.warning("Switch your net to Avax testnet");
            return;
        }
        const gamePaused = await web3FitfiPoolInterface().methods.paused().call();
        if (gamePaused === true) {
            toast.warning("Game is paused, so please wait");
            return;
        }
        const rewardAmount = await UserRewardAmount(account);
        console.log("userRewardAmount", rewardAmount);

        if (rewardAmount > 0) {
            await web3FitfiPoolInterface().methods.claimReward().send({
                from: account,
            })
                .then((res) => {
                    console.log("withdraw result", res);
                    toast.success("You claimed the reward successfully!");
                })
                .catch(err => {
                    console.log("withdraw error", err);
                });
        } else {
            toast.error("Your reward amount is 0");
        }
    }

    return (
        <div className="home-rules">
            <div className="container">
                <div className="home-rules-bg">
                    <div>
                        <div className="home-whitebigtext">Rules</div>
                        <div className="d-flex home-rules-textgap">
                            <div><img src="/assets/images/check.png" style={{ marginRight: "13px" }} alt="" width="20" /></div>
                            <div>
                                <div className="home-whitegeneraltext">STAKING HAVE 25% APY WITH SHORT LOCK TIME</div>
                                <div className="home-about-littletext" style={{ color: "white", opacity: "0.5", margin: "1.3% 0" }}>Holders can unstake deposit and claim rewards in any time after lock period. </div>
                            </div>
                        </div>
                        <div className="d-flex" style={{ marginBottom: "2%" }}>
                            <div><img src="/assets/images/check.png" style={{ marginRight: "13px" }} alt="" width="20" /></div>
                            <div>
                                <div className="home-whitegeneraltext">User can withdraw FitFi before the lock period</div>
                                <div className="home-about-littletext" style={{ color: "white", opacity: "0.5", margin: "1.3% 0" }}>but he will receive a penalty of 5% and no rewards.</div>
                            </div>
                        </div>
                        <div className="single-line" style={{ marginBottom: "2%" }}>
                            <div className="d-flex">
                                <div><img src="/assets/images/check.png" style={{ marginRight: "13px" }} alt="" width="20" /></div>
                                <div className="d-flex"><div className="home-whitegeneraltext" style={{ opacity: "0.5" }}>0.3% fees&nbsp;</div> <span className="home-whitegeneraltext" style={{ opacity: "1" }}>on claiming rewards.&nbsp;</span></div>
                            </div>
                            <div className="d-flex">
                                <div className="home-whitegeneraltext claimlink" style={{ cursor: "pointer" }} onClick={e => onClaim()}>Claim</div>
                                <div><img src="/assets/images/rightarrow.png" width="20" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rules;