import React from 'react';
import NavHomepage from '../../components/header/header.js';
import Footer from '../../components/footer/Footer.js';
import { restaurants } from '../restaurants.js';
import { Link } from 'react-router-dom';
import './mealsNear.css';

function MealsNear() {
    return (
        <div>
            <NavHomepage/>
            <div className="restGrid">
                <div className="gridHead">
                    <h2>Meals Near You</h2>
                </div>
                <div className="restingrid">
                    <div className="row restCards">
                    {restaurants.map((rest) => {
                            return (
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
                            )
                        }
                        )}
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default MealsNear