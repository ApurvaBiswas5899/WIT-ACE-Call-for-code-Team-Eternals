import React, { useState } from "react";

import Rect from "../../components/rect.png";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
// import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Button } from 'reactstrap';
// import { faStar, faStarHalf, faPlus } from '@fortawesome/free-solid-svg-icons';
// import Collapse from 'react-bootstrap/Collapse';

import './RestaurantPage.css';

import Slide from 'react-reveal/Slide';


const Reviews = ({ rating, name, headline }) => {

    const [open, setOpen] = useState(false);

    return (
        <>

            <Slide left>
                <span className="d-flex justify-content-between my-3">
                    <div className="col-sm-5 ">
                        {/*
                            (
                                () => {
                                    if (rating >= 5.0) {
                                       return <StarIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                    if (rating >= 4.0) {
                                       return <StarIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                    if (rating >= 3.0) {
                                       return <StarIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                    if (rating >= 2.0) {
                                        return <StarIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                    if (rating >= 1.0) {
                                        return <StarIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                    if ((rating == 4.5) || (rating == 3.5) || (rating == 2.5) || (rating == 1.5) || (rating == 0.5)) {
                                        return <StarHalfIcon fontSize="small" className="text-warning bg-light" />
                                    }
                                }
                            )
                        */}
                        <StarIcon fontSize="small" className="text-warning bg-light" />
                        <StarIcon fontSize="small" className="text-warning bg-light" />
                        <StarIcon fontSize="small" className="text-warning bg-light" />
                        <StarIcon fontSize="small" className="text-warning bg-light" />
                        <StarHalfIcon fontSize="small" className="text-warning bg-light" />

                        <p>{name}</p>
                        <p><b>{headline}</b></p>
                        {/* <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            color="white" size="sm"
                        >
                            See More <FontAwesomeIcon icon={faHandPointDown} className="mt-1 mx-1" />
                        </Button>
                        <Collapse in={open}>
                            <p id="example-collapse-text" className="my-2">
                                {text}
                            </p>
                        </Collapse> */}
                    </div>
                    <span className="d-inline ">
                        <img src={Rect} alt="Error" />
                        <img className="mx-2" src={Rect} alt="Error" />
                    </span>
                </span>
            </Slide>

        </>
    );
};
export default Reviews;
