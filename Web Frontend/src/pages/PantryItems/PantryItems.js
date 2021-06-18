import React from 'react';
import NavHomepage from '../../components/header/header.js';
import Footer from '../../components/footer/Footer.js';
import { restaurants } from '../restaurants.js';
import { Link } from 'react-router-dom';
import './pantryItems.css';
// import { Slide } from '@material-ui/core';
import Fade from 'react-reveal/Fade';

function PantryItems() {
    return (
        <div>
            <NavHomepage />
            <Fade bottom>
                <div className="restGrid">
                    <div className="gridHead">
                        <h2>Pantry Items Near You</h2>
                    </div>
                    <div className="restingrid">
                        <div className="row restCards">
                            {restaurants.map((rest) => {
                                return (
                                    // <Rotate>
                                    <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1">
                                        <div className="card restCard">
                                            <a href="#"><img className="card-img-top" src={rest.image} alt="" /></a>
                                            <div className="card-body p-0">
                                                <h4 className="card-title mb-0">
                                                    <a href="/menu">{rest.name}</a>
                                                </h4>
                                                <p className="card-text">
                                                    {rest.details.map((det) => {
                                                        return (
                                                            <span>{det} </span>
                                                        )
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    // </Rotate>
                                )
                            }
                            )}
                        </div>
                    </div>

                </div>
            </Fade>
            <Fade bottom>
                <Footer />
            </Fade>
        </div>
    )
}

export default PantryItems