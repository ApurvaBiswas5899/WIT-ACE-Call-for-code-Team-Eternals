import React, { useState } from 'react';

import { Tooltip } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';

//components
import Support from './support';
import Coin from './coin';

//css
import './profile.css';

//header footer
import Header from '../../components/headerHomepage/headerHomepage';
import Footer from '../../components/footer/Footer';

//placeholder
import DetailsPlaceholder from '../../components/placeHolder/profileDetails/detailsPlaceholder';

//metadata
import MetaData from '../../utils/metaData';

//images
import profile from './images/profile.png';
import edit from './images/edit.svg';
import support from './images/support.svg';
import supportBlack from './images/supportblack.svg';
import coin from './images/coin.svg';
import coinBlack from './images/coinblack.svg';
import order from './images/order.svg';
import orderBlack from './images/orderblack.svg';

import OrderSection from './Orderspage.js';

const Profile = () => {

  let profileDetailsResult = true;
  const userDetails = useSelector(state => state.user);

  const [orderIcon, setOrderIcon] = useState(true);
  const [coinIcon, setCoinIcon] = useState(false);
  const [supportIcon, setSupportIcon] = useState(false);

  //tooltip
  const [tooltipOpenOrder, setTooltipOpenOrder] = useState(false);
  const [tooltipOpenSupport, setTooltipOpenSupport] = useState(false);
  const [tooltipOpenBurppies, setTooltipOpenBurppies] = useState(false);

  const colorHandler = (e) => {
    // console.log('e', e.target);
    if (e.target.name === 'coincolor') {
      setCoinIcon(true);
      setSupportIcon(false);
      setOrderIcon(false);
    } else if (e.target.name === 'ordercolor') {
      setCoinIcon(false);
      setSupportIcon(false);
      setOrderIcon(true);
    } else if (e.target.name === 'supportcolor') {
      setCoinIcon(false);
      setSupportIcon(true);
      setOrderIcon(false);
    }
  };

  const toggleOrder = () => {
    setTooltipOpenOrder(!tooltipOpenOrder);
    setTimeout(() => {
      setTooltipOpenOrder(false);
    }, 1000);
  };

  const toggleBurppies = () => {
    setTooltipOpenBurppies(!tooltipOpenBurppies);
    setTimeout(() => {
      setTooltipOpenBurppies(false);
    }, 1000);
  };

  const toggleSupport = () => {
    setTooltipOpenSupport(!tooltipOpenSupport);
    setTimeout(() => {
      setTooltipOpenSupport(false);
    }, 1000);
  };

  return (
    <>
      <MetaData
        title={'Dashboard user'}
        description={
          'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.'
        }
      />
      <Header />
      <div className="conainer container-fluid  d-flex align-items-center justify-content-center flex-column profile-carousel">
        {profileDetailsResult ? (
          <>
            <div className="row container-md p-0 mx-2">
              <div className="col-4 col-md-3 d-flex justify-content-end">
                <div style={{ width: 57, height: 57 }}>
                  <img src={profile} alt="profile" className="image-size" />
                </div>
              </div>
              <div className="col-8 col-md-9">
                <div className="row">
                  <div className="col-7 col-md-6 d-flex d-flex flex-column">
                    {
                      userDetails.name ? (
                        <h3 className="profile-heading-color profile-heading-size m-0">
                          {userDetails.name}
                        </h3>
                      ) : (
                        <h3 className="profile-heading-color profile-heading-size m-0">
                          Benedict Cumberbatch
                        </h3>
                      )
                    }
                    <div className="d-flex flex-row flex-wrap profile-subheading-size profile-subheading-color">
                      {
                        userDetails.contactNo ? (
                          <span className="mx-1">{userDetails.contactNo}</span>
                        ) : (
                          <span className="mx-1">1234567890</span>
                        )
                      }
                      {
                        userDetails.email ? (
                          <span className="mx-1">{userDetails.email}</span>
                        ) : (
                          <span className="mx-1">burppUser@gmail.com</span>
                        )
                      }
                    </div>
                  </div>
                  <div className="col-5 col-md-6 d-flex justify-content-center p-0">
                    <div style={{ width: 26, height: 26 }}>
                      <img src={edit} alt="edit" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <DetailsPlaceholder />
          </>
        )}
        <div className="container-md  toggle-wrapper">
          <div className="d-flex flex-row flex-nowrap  justify-content-center nav nav-tabs border-none">
            <div
              className="toggle-handlers mx-md-5 nav-link active p-0 text-center"
              id="nav-order-tab"
              data-bs-toggle="tab"
              data-bs-target="#order"
              type="button"
              role="tab"
              aria-controls="order"
              aria-selected="true"
              onClick={colorHandler}
            >
              {orderIcon ? (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={orderBlack}
                      alt=""
                      className="image-size-icon my-1"
                      name="ordercolor"
                    />
                  </span>
                </>
              ) : (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={order}
                      alt=""
                      className="image-size-icon my-1"
                      name="ordercolor"
                    />
                  </span>
                </>
              )}
            </div>
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpenOrder}
              target="nav-order-tab"
              toggle={toggleOrder}
              trigger="click hover"
            >
              Orders
            </Tooltip>
            <div
              className="toggle-handlers mx-md-5 nav-link p-0 text-center"
              id="nav-coin-tab"
              data-bs-toggle="tab"
              data-bs-target="#coin"
              type="button"
              role="tab"
              aria-controls="coin"
              aria-selected="true"
              onClick={colorHandler}
            >
              {coinIcon ? (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={coinBlack}
                      alt=""
                      className="image-size-icon my-1"
                      name="coincolor"
                    />
                  </span>
                </>
              ) : (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={coin}
                      alt=""
                      className="image-size-icon my-1"
                      name="coincolor"
                    />
                  </span>
                </>
              )}
            </div>
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpenBurppies}
              target="nav-coin-tab"
              toggle={toggleBurppies}
              trigger="click hover"
            >
              Burppies
            </Tooltip>
            <div
              className="toggle-handlers mx-md-5 nav-link p-0 text-center"
              id="nav-support-tab"
              data-bs-toggle="tab"
              data-bs-target="#support"
              type="button"
              role="tab"
              aria-controls="support"
              aria-selected="true"
              onClick={colorHandler}
            >
              {supportIcon ? (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={supportBlack}
                      alt=""
                      className="image-size-icon my-1"
                      name="supportcolor"
                    />
                  </span>
                </>
              ) : (
                <>
                  <span style={{ height: 25, width: 25 }}>
                    <img
                      src={support}
                      alt=""
                      className="image-size-icon my-1"
                      name="supportcolor"
                    />
                  </span>
                </>
              )}
            </div>
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpenSupport}
              target="nav-support-tab"
              toggle={toggleSupport}
              trigger="click hover"
            >
              Support
            </Tooltip>
          </div>
        </div>
      </div>

      {/* form */}

      <div className="container p-0">
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="order"
            role="tabpanel"
            aria-labelledby="nav-order-tab"
          >
            <OrderSection />
          </div>
          <div
            class="tab-pane fade"
            id="coin"
            role="tabpanel"
            aria-labelledby="nav-coin-tab"
          >
            <Coin />
          </div>
          <div
            class="tab-pane fade"
            id="support"
            role="tabpanel"
            aria-labelledby="nav-support-tab"
          >
            {/* support component */}
            <div className=" d-flex flex-column mx-auto my-5 form-container">
              <Support />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
