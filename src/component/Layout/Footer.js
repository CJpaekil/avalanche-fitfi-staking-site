import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    const [pageExchange, setPageExchange] = useState("main");
    return (
        <div className={`${pageExchange === "main" ? " main-navbar" : "claim-navbar"}`}>
            <div className="container d-flex">
                <div className="col-sm-6 col-6 d-flex justify-content-start align-items-center">
                    <Link to="/"><img className="logo" src="/assets/images/Vector.png" /></Link>
                </div>
                <div className="col-sm-6 col-6 d-flex justify-content-end">
                    <button className="btn-social"><img src="/assets/images/telegram.png" /></button>
                    <button className="btn-social"><img src="/assets/images/discord.png" /></button>
                    <button className="btn-social"><img src="/assets/images/twitter.png" /></button>
                    <button className="btn-social"><img src="/assets/images/tlp.png" /></button>
                </div>
            </div>
        </div>
    )
}

export default Footer;