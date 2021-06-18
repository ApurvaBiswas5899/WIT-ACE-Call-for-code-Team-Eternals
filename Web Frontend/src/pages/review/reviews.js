import React from 'react';
import revimg from './images/review.png'
// import Rating from '../../../node_modules/@material-ui/lab/Rating'
import Rating from '@material-ui/lab/Rating';
// import Rating from 'material-ui-rating'
import { Image } from 'react-bootstrap';
import "./review.css";

function Reviews() {
    const creds=JSON.parse(localStorage.getItem("creds"));

    if(creds)
    {
        return (

            <>
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="row justify-content-md-center">
                            <div class="col col-lg-2">
    
                            </div>
    
                            <div class="col-sm-12 col-lg-4">
                                <Image className="img" src={revimg} fluid />
                            </div>
    
                            <div class="side col-sm-12 col-lg-4">
                                <div class="row">
                                    <h1 className="heading">John Doe</h1>
                                </div>
                                <div className="rating">
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                    <p className="Title">Handy and easy to use</p>
                                </div>
                                <div className="row d-flex " >
    
                                    <p className="time">
                                        By crystel on March 24,2019
                                            </p>
    
                                </div>
                                <div>
                                    <p className="para">
                                        React Rating is a react rating component which supports cstm
                                        symbols both with inline styles and glyphicons found in popular
                                        CSS Toolkits like Fontawesome or Bootstrap.This React compo
                                        was inspired by the jQuery plugin bootstrap-rating.
                                            </p>
                                </div>
                                <div>
                                    <h3 className="Title">Image for review</h3>
                                    <img className="smallimg" src={revimg} alt="reviewimg" />
    
                                </div>
                            </div>
    
                            <div class="col col-lg-2">
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else
    {
        return(
            <>
                <span className="input-group-btn">
                <a href="/login" >Login to Proceed</a>
                </span>
            </>
        )
    }
}

export default Reviews; 