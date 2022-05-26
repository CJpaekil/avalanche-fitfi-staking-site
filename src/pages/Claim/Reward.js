import { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { web3FitfiPoolInterface } from "../../web3/Hook";
import { useWeb3React } from "@web3-react/core";
import { UserRewardAmount } from "../../utils/common";

const Claim = () => {
    const { account } = useWeb3React();
    const [rewardAmount, setRewardAmount] = useState("0");
    setInterval(async () => {
        if (account) {
            setRewardAmount(await UserRewardAmount(account));
        }
    }, 1000 * 10);

    return (
        <div className="claim-reward">
            <div className="container">
                <Link to="/" style={{ textDecoration: "none" }}><div className="d-flex justify-content-start"><img src="/assets/images/arrow.png" style={{ marginRight: "10px" }} alt="" width="25" /><div className="claim-backtext">BACK</div></div></Link>
                <div className="single-line claim-rewardgap">
                    <div className="claim-rewardtext">YOUR REWARDS:&nbsp;</div>
                    <div className="d-flex">
                        <div className="claim-rewardtext reward-number" style={{ color: "white" }}>{rewardAmount}&nbsp;</div>
                        <div className="claim-rewardopacity d-flex align-items-center fitfi">fITFI</div>
                    </div>
                </div>
                <div className="claim-rewardopacity">+0 PER DAY / +0 PER DAY</div>
            </div>
        </div>
    )
}

export default Claim;