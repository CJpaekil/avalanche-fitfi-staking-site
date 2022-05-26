import Web3 from "web3";
import FitfiPoolAbi from "../Abi/FitfiPool.json";
import FitfiTokenAbi from "../Abi/FitfiToken.json";
import {FitfiPoolAddress, FitfiTokenAddress} from "../ContractAddress/index";

export const web3FitfiPoolInterface = () => {
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(FitfiPoolAbi, FitfiPoolAddress);
    return contract;
}

export const web3FitfiTokenInterface = () => {
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(FitfiTokenAbi, FitfiTokenAddress);
    return contract;
}

