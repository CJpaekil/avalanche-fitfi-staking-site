// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract FitfiPool is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    using Strings for uint256;

    struct UserInfo {
        bool isStacker;
        uint256 depositAmount;
        uint256 rewardAmount;
        uint256 lastUserActionTime; // keep track of the last user action time.
        uint256 lockStartTime; // lock start time.
        uint256 lockEndTime; // lock end time.
    }

    mapping(address => UserInfo) public userInfo;
    bool public paused = true;
    uint256 public totalShares;
    address payable public treasury;

    uint256 public constant PENULTY_FEE     = 5; // 5%
    uint256 public constant MAX_FIVE_APY    = 14; // 14%
    uint256 public constant MAX_TEN_APY     = 25; // 25%
    uint256 public constant MAX_THIRTY_APY  = 32; // 32%
    uint256 public constant MAX_FIVE_PERIOD = 5 days; 
    uint256 public constant MAX_TEN_PERIOD  = 10 days;
    uint256 public constant MAX_THIRTY_PERIOD = 30 days;
    uint256 public constant MIN_DEPOSIT_AMOUNT = 10 ether;
    uint256 public MAX_LOCK_DURATION = 365 days; // 365 days

    // address _tokenAdd = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;

    IERC20 private fitfiToken;

    constructor(
        IERC20 myToken,
        address payable _treasury
    ) {
        fitfiToken = myToken;
        treasury = _treasury;
    }

    function pause() public onlyOwner {
        require(paused == false, "Already Paused");
        paused = true;
    }

    function unpause() public onlyOwner {
        require(paused == true, "Already running");
        paused = false;
    }

    function isStacker() public view returns(bool) {
        UserInfo storage user = userInfo[msg.sender];
        return (user.isStacker);
    }

    // /**
    //  * @notice Deposits a dummy token to `MASTER_CHEF` MCV2.
    //  * It will transfer all the `dummyToken` in the tx sender address.
    //  * @param dummyToken The address of the token to be deposited into MCV2.
    //  */
    function init() public {
        require(treasury != address(0), "Treasury is not zero address");
        require(treasury == msg.sender, "This contract can be called only by treasury");
        uint256 balance = fitfiToken.balanceOf(msg.sender);
        require(balance > 0, "Balance not enough");
        fitfiToken.safeTransferFrom(msg.sender, address(this), balance);
        totalShares += balance;
    }

    function claimAllShares () public {
        require(treasury != address(0), "Treasury is not zero address");
        require(treasury == msg.sender, "This contract can be called only by treasury");
        uint256 balance = fitfiToken.balanceOf(address(this));
        require(balance > 0, "Balance not enough");
        fitfiToken.safeTransfer(msg.sender, balance);
        totalShares = 0;
    }

    modifier whenNotPaused() {
        require(paused == false, "Fitfi: Not running");
        _;
    }

    modifier minDepositAmount(uint256 _amount) {
        require(_amount >= 0, "Fitfi: Min deposit amount is 10 fitfi");
        _;
    }

    function deposit(uint256 _amount) public whenNotPaused minDepositAmount(_amount){
        depositOperation(_amount, msg.sender);
    }


    function depositOperation(
        uint256 _amount,
        address _user
    ) internal {
        UserInfo storage user = userInfo[_user];
        user.isStacker = true;
        user.rewardAmount   = calculatorReward(_user);
        user.depositAmount  += _amount;
        user.lockStartTime = block.timestamp;
        
        totalShares += _amount;
        fitfiToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function calculatorReward(address _user) private returns (uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 lockedDuration_ = 0;
        if (user.lockStartTime != 0 && block.timestamp >= user.lockStartTime + MAX_TEN_PERIOD) {
            lockedDuration_ = block.timestamp - user.lastUserActionTime;
        }
        user.lastUserActionTime = block.timestamp;
        return user.rewardAmount + user.depositAmount * MAX_TEN_APY / (100 * MAX_LOCK_DURATION) * lockedDuration_;
    }


    function checkRewardAmount() public returns (uint256){
        return calculatorReward(msg.sender);
    }

    function claimReward() public whenNotPaused {
        uint256 rewardAmount_ = calculatorReward(msg.sender);
        require(rewardAmount_ > 0, "Not enough reward amount");
        if (totalShares < rewardAmount_) {
            paused = true;
            revert("Balance Not Enough.");
        }
        
        totalShares -= rewardAmount_;
        UserInfo storage user = userInfo[msg.sender];
        fitfiToken.safeTransfer(msg.sender, rewardAmount_);
        user.rewardAmount = 0;
    }

    function checkLockedTime() public view returns (uint256){
        UserInfo storage user = userInfo[msg.sender];
        if (user.lockStartTime != 0) {
            return block.timestamp - user.lockStartTime;
        } else {
            return 0;
        }
    }

    function withdraw() public whenNotPaused {
        UserInfo storage user = userInfo[msg.sender];
        require(user.depositAmount > 0, "Not enough deposited amount");
        if (totalShares < user.depositAmount) {
            paused = true;
            revert("Balance Not Enough.");
        }
        
        uint256 penultyPercent_ = 0;
        if (block.timestamp < user.lockStartTime + MAX_TEN_PERIOD) {
            penultyPercent_ = PENULTY_FEE;
        }

        user.rewardAmount = calculatorReward(msg.sender);
        uint256 amount_ = user.depositAmount * (100 - penultyPercent_) / 100 + user.rewardAmount;
        
        fitfiToken.safeTransfer(msg.sender, amount_);

        totalShares -= amount_;
        user.rewardAmount = 0;
        user.depositAmount = 0;
        user.lockStartTime = 0;
    }
    
    /**
     * @notice Set treasury address
     * @dev Only callable by the contract owner.
     */
    function setTreasury(address payable _treasury) public onlyOwner {
        require(_treasury != address(0), "Cannot be zero address");
        treasury = _treasury;
    }
}