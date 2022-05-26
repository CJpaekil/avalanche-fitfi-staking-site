
const About = () => {

    return (
        <div className="home-about">
            <div className="container">
                <div className="row">
                    <div className="home-about-halfpart justify-content-start">
                        <div className="d-flex">
                            <div className="home-whitebigtext" style={{ color: "#2C2F36" }}>ABOUT&nbsp;</div>
                            <div className="home-whitebigtext">STAKING</div>
                        </div>
                    </div>
                    <div className="home-about-halfpart home-about-righttext">
                        <div className="d-flex">
                            <div className="home-about-littletext">We represent а group of DeFy investors, who are interested in FitFi liquidity and ready to pay a high % of all holders, who take advantage of our offer.
                            </div>
                            <div className="home-about-littletext">This offer is limited to 5m FitFi, after that new users will not be able to stake. Old deposits in staking continue to receive rewards.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;