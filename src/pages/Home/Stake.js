
import { Link } from "react-router-dom";
const Stake = () => {
    return (
        <div className="home-stake">
            <div className="container home-stake-btgap">
                <div className="row">
                    <div className="home-stake-left">
                        <div>
                            <div className="home-yellowlittletext">We offer great offer for FitFi holders:</div>
                            <div className="d-flex align-items-center">
                                <div className="home-whitebigtext" style={{ marginTop: "20px" }}>STAKE YOUR FIFTI TOKEN UP TO&nbsp;<span className="home-yellowbigtext">25% APY</span></div>

                            </div>
                            <div className="d-flex home-everyday">
                                <div className="d-flex align-items-center" style={{ marginRight: "13px" }}><img className="check-size" src="/assets/images/check.png" alt="" width="20" /></div>
                                <div className="home-whitegeneraltext">Get rewards every day!</div>
                            </div>
                            <div className="d-flex justify-content-start">
                                <Link to="/claim"><button className="btn-staking">Go to Staking</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="home-stake-right" style={{ position: "relative" }}>
                        <img src="/assets/images/feet.png" alt="" width="85%" />
                        <div className="APY">
                            <div>
                                <div className="bigtext">ApY 25%</div>
                                <div className="littletext">10 days lock</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stake;