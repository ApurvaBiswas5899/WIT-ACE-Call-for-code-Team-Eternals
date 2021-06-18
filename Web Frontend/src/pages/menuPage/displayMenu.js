import React, { useState } from "react";
import DishPic from "../../components/DishPic.png";
import Fade from 'react-reveal/Fade';

// import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from 'reactstrap';
import Collapse from 'react-bootstrap/Collapse';
import './RestaurantPage.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToOrder } from '../../actions/views/order.js';
// import { urlencoded } from "express";

const DisplayMenu = props => {

    return (

        <>
            <Fade bottom >
                <div className="menu-item card p-2 my-3 p-sm-1 p-md-2 py-1 border">

                    <div className="card-body py-0 pt-2" >

                        <span className="d-flex my-0">

                            <div className="m-0">

                                <img src={props.item.images} alt="err" style={{ width: "43px" }} />
                            </div>

                            <div className="restro-details d-flex flex-column mx-1">

                                <h5>{props.item.name}</h5>

                                <p>
                                    <span className="ml-5 text-muted">

                                        &#8377;{props.item.price}
                                    </span>
                                    {/* <span className="px-2">&#8377;{props.menu.discountedPrice}</span>
                                    <span className="text-danger px-2">{props.menu.discount}off</span> */}
                                </p>
                                {/* <p className="text-dark ml-5 adjust-text-size">
                                    <Button
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                        color="white" size="sm"
                                    >
                                        {props.text}<FontAwesomeIcon icon={faHandPointDown} className="mt-1 mx-1" />
                                    </Button>
                                </p> */}
                            </div>

                            <div className="flex-grow-1 ">
                                {/* This should be kept as it is to give an empty space.   */}
                            </div>

                            <button className="add-btn justify-content-end my-0 btn btn-sm btn-outline-danger "
                                onClick={() => {
                                    console.log(props.item);
                                    props.actions.addToOrder(props.item)
                                }}
                            >
                                Add +
                            </button>
                        </span>
                        {/* <Collapse in={open}>
                            <div id="example-collapse-text">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea proident.
                            </div>
                        </Collapse> */}
                    </div>
                </div>
            </Fade >
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        // menu: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addToOrder,
        }, dispatch),
    };
}

export default connect(mapStateToProps,
    mapDispatchToProps)(DisplayMenu);
