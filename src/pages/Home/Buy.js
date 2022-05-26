
const Buy = () => {

    return (
        <div className="home-buy">
            <div className="container">
                <div className="home-whitebigtext">Where to buy</div>
                <div className="row" style={{ padding: "4% 0", borderBottom: "1px solid #393D46" }}>
                    <div className="col-sm-3 buycard-gap">
                        <div className="buycard">
                            <div><img className="buy" src="/assets/images/buy.png" /></div>
                        </div>
                    </div>
                    <div className="col-sm-3 buycard-gap">
                        <div className="buycard">
                            <div><img className="kucoin" src="/assets/images/kucoin.png" /></div>
                        </div>
                    </div>
                    <div className="col-sm-3 buycard-gap">
                        <div className="buycard">
                            <div><img className="okex" src="/assets/images/okex.png" /></div>
                        </div>
                    </div>
                    <div className="col-sm-3 buycard-gap">
                        <div className="buycard">
                            <div><img className="huobi" src="/assets/images/huobi.png" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buy;