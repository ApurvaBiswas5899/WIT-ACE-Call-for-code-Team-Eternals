import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import BlogImage from './images/BlogPic.png';
import 'bootstrap/dist/css/bootstrap.css';
import "./blogPage.css";
// import { Link } from "react-router-dom";
import Header from "../../components/header/header.js";
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

function Blog() {

    const [expand, setExpand] = useState(true);

    return (
        <>
            <Header />
            <Bounce>
                <h1 className="blogpost mt-5">
                    Blogpost
                    </h1>
            </Bounce>
            <div className="card bg-white text-white mt-3">
            <Zoom>
                <img src={BlogImage} className="card-img" alt="Error loading Blog Image" />
            </Zoom>
               
                <div className="card-img-overlay">
                  <Flip top>
                    <h1 className="card-title text-uppercase fs-1 font-weight-bold">Food And Work</h1>
                  </Flip>
                </div>
            </div>
            <Fade bottom>
            <div className="mt-4 mb-5 bg-white w-75 justify-content-center mx-auto">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel...</span>
                {
                    expand ?
                        <>
                            <span>erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac.
                In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.</span>
                            <button className="d-block mt-2 btn btn-outline-secondary btn-sm" onClick={() => setExpand(false)}>Read Less</button>
                        </>
                        :
                        <>
                            <button className="d-block mt-2 btn btn-outline-secondary btn-sm" onClick={() => setExpand(true)}>Read More</button>
                        </>
                }
            </div>
            </Fade>
        </>
    )
}

export default Blog;