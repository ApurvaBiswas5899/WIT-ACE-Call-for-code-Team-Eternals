import React from 'react';
import Logo from './images/burppLogo.png';
import arrow from './images/arrow.png';
import appStoreDown from './images/AppStoreDownload.png';
import googleDownlaod from './images/googlePlayDownload.png';
import twitterLogo from './images/twitterLogo.png';
import instagramLogo from './images/instagramLogo.png';
import fbLogo from './images/fbLogo.png';
import linkedinLogo from './images/linkedinLogo.png';
import './footer.css';

//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";

function footer() {
    return (
        <div className="footer container-fluid py-5 px-md-5">

            <div className="upperFooter d-sm-flex ">

                <div className="burppLogo mt-5 mt-sm-0 flex-grow-1">
                    <img src={Logo} />
                </div>
                <div className="iconDiv mt-5 mt-sm-0 flex-grow-0 " >

                    <div className="followUs">follow us on</div>

                    <div className="socialIcons">

                        <a href="#" style={{ textDecoration: "none" }}><img src={instagramLogo} className=" mt-3 mx-1" /></a>

                        <a href="https://www.facebook.com/burppit" target="_blank" style={{ textDecoration: "none" }}><img src={fbLogo} className=" mt-3 mx-1" /></a>

                        <a href="https://www.linkedin.com/company/burpp/" target="_blank" style={{ textDecoration: "none" }}><img src={linkedinLogo} className=" mt-3 mx-1" /></a>

                        <a href="#" style={{ textDecoration: "none" }}><img src={twitterLogo} className=" mt-3 mx-1" /></a>
                    </div>
                </div>
            </div>

            {/* <div className="upperFooter d-flex">
                <div className="burppLogo mt-5 mt-sm-0 flex-grow-1">
                    <img src={Logo} />
                </div>
                <div className="iconDiv mt-5 mt-sm-0 flex-grow-1 justify-content-end justify-content-sm-end">
                    <div>
                        <img src={arrow} />
                        <div className="followUs">follow Us On</div>
                    </div>
                    <div className="socialIcons">
                        <a href="#" style={{ textDecoration: "none" }}><img src={instagramLogo} className=" mt-3 mx-1" /></a>
                        <a href="https://www.facebook.com/burppit" target="_blank" style={{ textDecoration: "none" }}><img src={fbLogo} className=" mt-3 mx-0" /></a>
                        <a href="https://www.linkedin.com/company/burpp/" target="_blank" style={{ textDecoration: "none" }}><img src={linkedinLogo} className=" mt-3 mx-1" /></a>
                        <a href="#" style={{ textDecoration: "none" }}><img src={twitterLogo} className=" mt-3 mx-0" /></a>
                    </div>
                </div>
            </div> */}
            <div className="lowerFooter d-flex flex-wrap justify-content-sm-start">
                <div className="companyDiv mx-4 mx-sm-4">
                    <div className="divTitle" >COMPANY</div>
                    <div className="d-flex flex-column" >
                        <a href="#" style={{ textDecoration: "none" }}>Who we are</a>
                        <a href="#" style={{ textDecoration: "none" }}>Blog</a>
                        <a href="#" style={{ textDecoration: "none" }}>Careers</a>
                        <a href="#" style={{ textDecoration: "none" }}>Report Fraud</a>
                        <a href="#" style={{ textDecoration: "none" }}>Contact</a>
                    </div>
                </div>
                <div className="companyDiv mx-4 mx-sm-4">
                    <div className="divTitle">FOR FOODIES</div>
                    <div className="d-flex flex-column" >
                        <a href="#" style={{ textDecoration: "none" }}>Code Of Conduct</a>
                        <a href="#" style={{ textDecoration: "none" }}>Community</a>
                        <a href="#" style={{ textDecoration: "none" }}>Blogger Help</a>
                        <a href="#" style={{ textDecoration: "none" }}>Developers</a>
                        <a href="#" style={{ textDecoration: "none" }}>Mobile Apps</a>
                    </div>
                </div>
                <div className="companyDiv mx-4 mx-sm-4">
                    <div className="divTitle">FOR RESTAURANTS</div>
                    <div className="d-flex flex-column" >
                        <a href="#" style={{ textDecoration: "none" }}>Add Restaurant</a>
                        <a href="#" style={{ textDecoration: "none" }}>Claim your Listing</a>
                        <a href="#" style={{ textDecoration: "none" }}>Business App</a>
                        <a href="#" style={{ textDecoration: "none" }}>Restaurant Widgets</a>
                        <a href="#" style={{ textDecoration: "none" }}>Products for Businesses</a>
                    </div>
                </div>
                <div className="companyDiv mx-4 mx-sm-4">
                    <div className="divTitle">FOR YOU</div>
                    <div className="d-flex flex-column" style={{ color: "white" }}>
                        <a href="#" style={{ textDecoration: "none" }}>Privacy</a>
                        <a href="#" style={{ textDecoration: "none" }}>Terms</a>
                        <a href="#" style={{ textDecoration: "none" }}>Security</a>
                        <a href="#" style={{ textDecoration: "none" }}>Contact Us</a>
                    </div>
                </div>
                <div className="companyDiv mx-sm-4 mx-4 d-flex flex-column">
                    <a href="#"><img src={appStoreDown}></img></a>
                    <a href="#"><img src={googleDownlaod}></img></a>
                </div>
            </div>
        </div>
    )
}

export default footer
