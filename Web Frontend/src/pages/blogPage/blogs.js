import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import GenBlogImg1 from './images/BlogGen1.png';
import GenBlogImg2 from './images/BlogGen2.png';
import GenBlogImg3 from './images/BlogGen3.png';
import BlogImg1 from './images/Blog1.png';
import BlogImg2 from './images/Blog2.png';
import BlogImg3 from './images/Blog3.png';
import BlogImg4 from './images/Blog4.png';
import 'bootstrap/dist/css/bootstrap.css';
import "./blogPage.css";
// import { Link } from "react-router-dom";
import Header from "../../components/header/header.js";
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';

function MainBlogPage() {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const monthName = months[d.getMonth()];
    return (
        <>
            <Header />
            <div className="blogs">
            
              <Bounce>
                <h1 className="blogpost mt-4">
                    Blogpost
                </h1>
              </Bounce>    
                <div className="container-fluid mx-3 mx-sm-4 mx-lg-5 mt-1">
                    <div className="row">
                        <div className="card col-5 col-sm-3 col-md-2  mx-2 mt-4" >
                        <Flip left>
                            <a href="/blog">
                                <img src={GenBlogImg1} className="card-img-top" alt="Blog Image" />
                            </a>
                        </Flip>    
                            <Bounce>
                            <div class="card-body">
                                <p class="card-title text-danger fw-bold card-text">The art of cooking</p>
                                <p class="card-subtitle mb-2 fw-bold card-text">by ABCDE</p>
                            </div>
                            </Bounce>
                        </div>
                        <div className="card col-5 col-sm-3 col-md-2  mx-2 mt-4" >
                          <Flip left>
                            <a href="/blog"><img src={GenBlogImg2} className="card-img-top" alt="Blog Image" /></a>
                          </Flip>  
                            <Bounce>
                            <div class="card-body">
                                <p class="card-title text-danger fw-bold card-text">The art of cooking</p>
                                <p class="card-subtitle mb-2 fw-bold card-text">by ABCDE</p>
                            </div>
                            </Bounce>
                        </div>
                        <div className="card col-5 col-sm-3 col-md-2  mx-2 mt-4" >
                        <Flip left>
                            <a href="/blog"><img src={GenBlogImg3} className="card-img-top" alt="Blog Image" /></a>
                        </Flip>
                            <Bounce>
                            <div class="card-body">
                                <p class="card-title text-danger fw-bold card-text">The art of cooking</p>
                                <p class="card-subtitle mb-2 fw-bold card-text">by ABCDE</p>
                            </div>
                            </Bounce>
                        </div>
                    </div>
                </div>
                <Bounce>
                <h2 className="month-special mt-3">
                    {monthName}
                </h2>
                </Bounce>
                <Fade bottom>
                <div className="container-fluid mx-3 mx-sm-4 mx-lg-5 mt-4 mb-5 ">
                    <div className="row">
                      <Rotate>
                        <div className="card col-6 col-md-3 mt-3 px-4">
                            <a href="/blog"><img src={BlogImg1} className="card-img-top" alt="Blog Image" /></a>
                        </div>
                      </Rotate> 
                      <Rotate> 
                        <div className="card col-6 col-md-3 mt-3 px-4">
                            <a href="/blog"><img src={BlogImg2} className="card-img-top" alt="Blog Image" /></a>
                        </div>
                       </Rotate> 
                       <Rotate>
                        <div className="card col-6 col-md-3 mt-3 px-4">
                            <a href="/blog"><img src={BlogImg3} className="card-img-top" alt="Blog Image" /></a>
                        </div>
                        </Rotate>
                        <Rotate>
                        <div className="card col-6 col-md-3 mt-3 px-4">
                            <a href="/blog"><img src={BlogImg4} className="card-img-top" alt="Blog Image" /></a>
                        </div>
                        </Rotate>
                    </div>
                </div>
                </Fade>
            </div>
        </>
    )

}

export default MainBlogPage;