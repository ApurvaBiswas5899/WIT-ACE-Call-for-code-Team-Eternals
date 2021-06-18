import React, { useState, Component } from 'react';
// import { Image } from 'react-bootstrap';
import NavHomepage from '../../components/header/header.js';
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';
// import Zoom from 'react-reveal/Zoom';
// import Slide from 'react-reveal/Slide';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import Bounce from 'react-reveal/Bounce';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from 'axios';
// import Fade from 'react-reveal/Fade';
// import happyMe from './images/happyMe.png';
// import burppCoin from './images/burppCoin.png';
// import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import ProfileDetails from './profileDetails.js';
import UserPoints from './userPoints.js';
import ContactUs from './cantactUs.js';
import PreviousOrder from './pastOrder.js';

import orderImg from '../../components/DishPic.png';
import { Image, Button, Collapse } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuth, getOrder } from '../../actions/views/user.js';
import Preloader from '../../components/preloader.js';

function ProfilePage(props) {
  const [toggler, setToggler] = useState('past-orders');
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(1);

  React.useEffect(() => {
    if (props.userInfo._id) {
      props.actions.getOrder(props.userInfo._id).then((result) => {
        if (result.success) {
          setShow(2);
        } else {
          window.location = '/login';
        }
      });
    } else {
      window.location = '/login';
    }
  }, []);

  function triggerPast() {
    setToggler('past-orders');
    setCount(0);
  }

  function triggerContact() {
    setToggler('contact-us');
    setCount(1);
  }

  if (show === 1) {
    return (
      <>
        <Preloader />
      </>
    );
  } else {
    return (
      <>
        <NavHomepage />
        <ProfileDetails info={props.userInfo} />
        {/* <div className=" buttons d-flex flex-row justify-content-center">
          <Button style={{ boxShadow: "1px 5px 5px 3px rgba(0,0,0,.25)", background: "#EF5B5B", border: "none" }} className=" buttonred rounded-pill  border-2 btn-sm px-sm-4 m-2 " variant="danger">Past Orders</Button>
          <Button className="rounded-pill z-depth-5 btn-sm px-sm-4 m-2" variant="outline-dark" >Address</Button>
        </div> */}
        <div className="row mx-3 my-5">
          <UserPoints />

          <div className="col-12 col-md-8 col-lg-9">
            <div className="p-0">
              {
                // a small glitch is there on loading - TODO
                count === 1 ? (
                  <div className="d-flex align-items-center mt-3 mt-md-0">
                    <div
                      onClick={triggerPast}
                      className="past-contact"
                      style={{ opacity: '0.6' }}
                    >
                      Past Orders
                    </div>
                    <div
                      onClick={triggerContact}
                      className="mx-5 past-contact-active boldest-text"
                    >
                      Contact Us
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center mt-3 mt-md-0">
                    <div
                      onClick={triggerPast}
                      className="past-contact-active boldest-text"
                    >
                      Past Orders
                    </div>
                    <div
                      onClick={triggerContact}
                      className="past-contact mx-5"
                      style={{ opacity: '0.6' }}
                    >
                      Contact Us
                    </div>
                  </div>
                )
              }
              {toggler === 'past-orders' ? (
                <>
                  {
                    // console.log(props.pastOrder),

                    props.pastOrder.length ? (
                      <div
                        style={{ maxHeight: '375px' }}
                        className="overflow-auto px-2"
                      >
                        {props.pastOrder
                          .slice(0)
                          .reverse()
                          .map((item) => {
                            return <PreviousOrder items={item} />;
                          })}
                      </div>
                    ) : (
                      <div
                        className="mx-auto my-2 px-3 py-2 rounded-lg my-shadow-out border border-light w-100 d-flex justify-content-center align-items-center"
                        style={{ minHeight: '250px' }}
                      >
                        No Previous orders
                      </div>
                    )
                  }
                </>
              ) : (
                <ContactUs />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pastOrder: state.user.orders,
    userInfo: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAuth,
        getOrder,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
