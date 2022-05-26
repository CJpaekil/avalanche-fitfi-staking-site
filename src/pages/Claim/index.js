import Reward from "./Reward";
import Walletconnect from "./Walletconnect";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { web3FitfiPoolInterface, web3FitfiTokenInterface } from "../../web3/Hook";
import { FitfiPoolAddress } from "../../web3/ContractAddress";
import StakingModal from "../../component/Modal/StakingModal";
import ApproveCertainModal from "../../component/Modal/ApproveCertainModal";
import Web3 from "web3";
import { metamask } from "../../web3/walletConnector";
import { PassedLockTime } from "../../utils/common";


const Claim = () => {
    const { chainId, account, activate } = useWeb3React();
    const [stakeValue, setStakeValue] = useState(0);
    const [displayStakedValue, setDisplayStakedValue] = useState(0);
    const [showStakingModal, setShowStakingModal] = useState(false);
    const [showApproveModal, setApproveModal] = useState(false);
    const [approveOkValue, setApproveOkValue] = useState(false);
    const [passedlockDuration, setPassedlockDuration] = useState(null);
    const [balance, setBalance] = useState(0);

    const onStake = async () => {
        if (!account) {
            toast.error("Connect your wallet");
            return;
        }

        if (stakeValue === 0) {
            toast.error("Please enter stake value");
            return;
        }
        if (chainId != 43113) {
            toast.warning("Switch your net to Avax testnet");
            return;
        }
        // if (stakeValue <= 10) {
        //     toast.warning("Have to Deposit 10 Fitfi at least");
        //     return;
        // }
        const gamePaused = await web3FitfiPoolInterface().methods.paused().call();
        console.log("gamePaused", gamePaused);
        if (gamePaused === true) {
            toast.warning("Game is paused, so please wait");
            return;
        }
        setShowStakingModal(true);
    }

    const onStaked = async () => {
        const userInfo = await web3FitfiPoolInterface().methods.userInfo(account).call();
        setDisplayStakedValue(Web3.utils.fromWei(userInfo.depositAmount.toString(), 'ether'));
    }

    const onConfirmStaking = async () => {
        const fitfiAmount = Web3.utils.toWei(stakeValue.toString(), 'ether');
        const userInfo = await web3FitfiPoolInterface().methods.userInfo(account).call();
        if (userInfo.isStacker) {
            await web3FitfiPoolInterface().methods.deposit(fitfiAmount).send({
                from: account,
            })
                .then(async (res2) => {
                    toast.success("You staked successfully!");
                    await onStaked();
                })
                .catch(err2 => {
                    console.log("deposit error", err2);
                });
        } else {
            const approveAmount = Web3.utils.toWei("1000000000000000000", 'ether');
            await web3FitfiTokenInterface().methods.approve(FitfiPoolAddress, approveAmount).send({
                from: account,
            })
                .once('transactionHash', (hash) => {
                    console.log("hash", hash);
                })
                .then(async (res1) => {
                    console.log("approve result", res1);
                    await web3FitfiPoolInterface().methods.deposit(fitfiAmount).send({
                        from: account,
                    })
                        .then((res2) => {
                            console.log("deposit result", res2);
                        })
                        .catch(err2 => {
                            console.log("deposit error", err2);
                            toast.success("You staked successfully!");
                        });
                })
                .catch(err1 => {
                    console.log("approve error", err1);
                });
        }
    }

    const onWithraw = async () => {
        if (!account) {
            toast.error("Connect your wallet");
            return;
        }

        if (chainId != 43113) {
            toast.warning("Switch your net to Avax testnet");
            return;
        }
        const gamePaused = await web3FitfiPoolInterface().methods.paused().call();
        console.log("gamePaused", gamePaused);
        if (gamePaused === true) {
            toast.warning("Game is paused, so please wait");
            return;
        }
        const userInfo = await web3FitfiPoolInterface().methods.userInfo(account).call();

        console.log("userInfo", userInfo);
        if (userInfo.depositAmount === "0") {
            toast.error("You deposited nothing");
            return;
        }

        const passedLockDuration = await PassedLockTime(account);
        console.log("passedLockDuration", passedLockDuration);
        if (!passedLockDuration) {
            setPassedlockDuration("nonpassed");
        }
        else {
            setPassedlockDuration("passed");
        }
        setApproveModal(true);
    }

    useEffect(() => {
        async function init() {
            await web3FitfiPoolInterface().methods.withdraw().send({
                from: account,
            })
                .then((res2) => {
                    console.log("withdraw result", res2);
                    toast.success("Your withdraw completed successfully!");
                })
                .catch(err2 => {
                    console.log("withdraw error", err2);
                });
        }
        if (approveOkValue) {
            init();
            setApproveModal(false);

        }
    }, [approveOkValue])

    useEffect(() => {
        async function init() {
            if (account) {
                await onStaked();
                const fitfiBalance = await web3FitfiTokenInterface().methods.balanceOf(account).call();
                setBalance(Web3.utils.fromWei(fitfiBalance.toString(), 'ether'));

            }
        }
        init();
    })

    useEffect(() => {
        async function init() {
            const ConnectionStatus = sessionStorage.getItem('ConnectionStatus');
            if (ConnectionStatus === "True") {
                const { ethereum } = window;
                if (ethereum === undefined) {
                    toast.warning("Please install Metamask");
                    return;
                } else {
                    try {
                        await activate(metamask);
                    } catch (error) {
                        console.log("connectWallet error", error);
                    }
                }
            }

        }
        init();
    })

    const selfOk = () => {
        setApproveOkValue(true);

    }


    return (
        <>
            <div>
                <Reward />
            </div>
            <div>
                {account ?
                    <div className="wallet-connect">

                        <div className="container">
                            <div className="wallet-bg">
                                <div className="row" style={{ width: "100%" }}>
                                    <div className="claim-approve claim-approveorder1">
                                        <div className="claim-backtext" style={{ color: "white" }}>How much do you want to stake</div>
                                        <div className="d-flex">
                                            <div className="numbertext">
                                                <input type="text" value={stakeValue} onChange={(e) => setStakeValue(e.target.value)} className="stakingValue"></input>
                                            </div>
                                            <div className="fitfitext opsvoty-fitfi">FITFI</div>
                                        </div>
                                        <div className="maxtext">Max: {balance} fitfi</div>
                                    </div>
                                    <div className="claim-approve claim-approveorder3" style={{ position: "relative" }}>
                                        <div className="withrawCombine">
                                            <div className="d-flex">
                                                <div className="claim-backtext" style={{ color: "#FFB449", borderBottom: "1px solid #FFB449", cursor: "pointer" }} onClick={e => onWithraw()}>
                                                    Withdraw
                                                </div>
                                                <div className="claim-backtext" style={{ color: "#FFB449" }}>
                                                    &nbsp;/&nbsp;
                                                </div>
                                                <Link to="/How_work" style={{ textDecoration: "none" }}><div className="claim-backtext" style={{ color: "#FFB449", borderBottom: "1px solid #FFB449" }}>
                                                    How It Works?
                                                </div></Link>

                                            </div>
                                        </div>
                                        <div className="claim-stakedyou" style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                            <div className="d-flex">
                                                <div className="maxtext">Staked by You: {displayStakedValue}&nbsp;<span style={{ opacity: "1" }}>FItFI</span></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="claim-approve claim-approveorder2">
                                        <button className="btn-approve" onClick={onStake}>
                                            <div className="d-flex"><img src="/assets/images/circlecheck.png" style={{ marginRight: "10px" }} width="25" /><div className="claim-backtext">APPROVE</div></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <Walletconnect />
                }
                <StakingModal
                    open={showStakingModal}
                    onClose={() => setShowStakingModal(false)}
                    amount={stakeValue * 10 / 10}
                    onConfirm={onConfirmStaking}>
                </StakingModal>
                <ApproveCertainModal
                    open={showApproveModal}
                    onClose={() => setApproveModal(false)}
                    onOk={selfOk}
                    LockDuration={passedlockDuration}>
                </ApproveCertainModal>
            </div>
        </>
    )
}

export default Claim;