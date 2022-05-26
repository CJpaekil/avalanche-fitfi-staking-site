import { Link } from "react-router-dom";
const Howork = () => {
    return (
        <>
            <div className="claim-reward">
                <div className="container">
                    <Link to="/Claim" style={{ textDecoration: "none" }}><div className="d-flex justify-content-start"><img src="/assets/images/arrow.png" style={{ marginRight: "10px" }} width="25" /><div className="claim-backtext">BACK</div></div></Link>
                    <div className="single-line claim-rewardgap">
                        <div className="claim-rewardtext">HOW IT WORKS</div>
                    </div>
                </div>
            </div>

            <div className="howorks-text">
                <div className="container">
                    1. Stake $FITFI<br />
                    2. Earn rewards 25% APY<br />
                    3. 10 days cooldown, you can withdraw anytime, but during cooldown penalty 5% and no rewards<br />
                    4. 0.3% commission when you withdraw<br />
                    5. Total limit - 5m $FITFI, after that staking close, but all holders continue get rewards<br />
                </div>
            </div>

        </>
    )
}

export default Howork;