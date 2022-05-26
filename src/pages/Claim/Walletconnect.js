import { useWeb3React } from "@web3-react/core";
import { toast } from 'react-toastify';
import { metamask } from "../../web3/walletConnector";

const Walletconnect = () => {
    const { activate } = useWeb3React();

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

    return (
        <div className="wallet-connect">
            <div className="container">
                <div className="wallet-bg">
                    <div className="row">
                        <div className="walletconnection-left">
                            <div className="d-flex">
                                <div className="d-flex align-items-center"><img className="signal" src="/assets/images/signal.png" alt="" /></div>
                                <div className="claim-rewardopacity" style={{ color: "white", opacity: "1" }}>connect your wallet to continue</div>
                            </div>
                        </div>
                        <div className="claim-approve">
                            <button className="btn-approve">
                                <div className="d-flex"><img src="/assets/images/wallet.png" style={{ marginRight: "10px" }} alt="" width="25" /><div className="claim-backtext" onClick={ConnectWallet}>CONNECT WALLET</div></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Walletconnect;