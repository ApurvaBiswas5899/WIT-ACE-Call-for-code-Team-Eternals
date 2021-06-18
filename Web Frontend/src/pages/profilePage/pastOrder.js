import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';

import orderImg from "../../components/DishPic.png";
import { Image, Button, Collapse } from 'react-bootstrap';

function PreviousOrder({ items }) {

    console.log(items);

    return (
        <>
            <div className="bg-white mx-auto px-2 py-3 my-3 my-shadow-div">

                <div className="d-flex justify-content-between mx-0 mx-md-2">
                    <div className="d-flex">

                        <Image className="rounded-circle eatery-image" src={orderImg} fluid /> {/* items.restaurantImages[0] */}

                        <div className="mt-2 ml-sm-auto mx-3 cartrers ">
                            <h3 className="boldest-text">{items.restaurantName}</h3>
                            <p>{items.paymentMode}</p>
                        </div>
                    </div>

                    <div className="mt-2 ml-sm-auto mx-3 mx-md-4 mx-lg-5 cartrers">
                        <h3 className="boldest-text">{items.total}</h3>
                    </div>
                </div>

                {

                    items.foodItems.map((item) => {
                        return (
                            <div className="row my-1">
                                <div className="col-sm-1">

                                </div>
                                <div className="col-2 ml-2 imagecart">
                                    <Image className="rounded-circle " src={item.images} fluid />
                                </div>

                                <div className="head d-flex flex-row col-3 cartcontent mt-1">
                                    <h3>{item.name}</h3>
                                </div>

                                <div className="countings d-flex flex-row col-4 cartcontent mt-1">

                                    <h3 className="px-2 mt-1">{item.totalPrice} X {item.qty}</h3>

                                </div>

                                <div className="col-auto mt-1 cartcontent px-0">
                                    <h3 className="px-2 mt-1">Rs. {item.totalPrice * item.qty}</h3>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}

export default PreviousOrder;