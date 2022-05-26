import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { metamask } from "../../web3/walletConnector";

const Navbar = () => {
    const { active, account, deactivate, activate } = useWeb3React();
    const [summarizeAddress, setSummarizeAddress] = useState(null);
    const [pageExchange, setPageExchange] = useState("main");

    const ConnectWallet = async () => {
        const { ethereum } = window;
        if (ethereum === undefined) {
            toast.warning("Please install Metamask");
            return;
        } else {
            try {
                sessionStorage.setItem('ConnectionStatus', 'True');
                await activate(metamask);
            } catch (error) {
                console.log("connectWallet error", error);
            }
        }
    }

    const Dissconnect = async () => {
        try {
            await deactivate()
        } catch (error) {
            console.log('Error on disconnect:', error)
        }
    }

    const summarizeMetamaskaddress = async () => {
        if (account) {
            let result = account.substring(0, 4) + "..." + account.substring(account.length - 4, account.length);
            setSummarizeAddress(result);
        }

    }

    useEffect(() => {
        if (account) {
            summarizeMetamaskaddress();
        }
    })

    useEffect(() => {
        if (window.location.href.includes("/claim")) {
            setPageExchange("claim");
        } else {
            setPageExchange("main");
        }
    })

    return (
        <>
            {
                pageExchange === "main" ? (
                    <div className="main-navbar">
                        <div className="container d-flex">
                            <div className="col-sm-6 col-6 d-flex justify-content-start align-items-center">
                                <Link to="/"><img className="logo" src="/assets/images/Vector.png" alt="" /></Link>
                            </div>
                            <div className="col-sm-6 col-6 d-flex justify-content-end">
                                <Link to="/claim"><button className="btn-staking">Go to Staking</button></Link>
                            </div>
                        </div>
                    </div>) : (
                    <div className="claim-navbar">
                        <div className="container d-flex">
                            <div className="col-sm-6 col-6 d-flex justify-content-start align-items-center">
                                <Link to="/"><img className="logo" src="/assets/images/logo.png" alt="" /></Link>
                            </div>
                            <div className="col-sm-6 col-6 d-flex justify-content-end">
                                {
                                    active ? (<button className="btn-connectwallet" onClick={Dissconnect}>Disconnect&nbsp;{summarizeAddress}</button>)
                                        :
                                        (<button className="btn-connectwallet" onClick={ConnectWallet}>CONNECT WALLET</button>)
                                }

                            </div>
                        </div>
                    </div>)
            }

        </>

    )
}

export default Navbar;