import React, { useState, useEffect } from 'react';

import walker from './images/walker.svg';
import walkerDull from './images/walker-dull.svg';
import star from './images/star.svg';
import Restaurant_img from '../../components/images/restaurant_back-2.png';

const RestoBack = (props) => {
  const { details } = props;
  const [distance, setDistance] = useState(1);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    let updatedDistance = getDistanceFromLatLonInKm(
      details.latitude,
      details.longitude,
      props.latitude,
      props.longitude
    );
    updatedDistance = updatedDistance.toFixed(2);
    setDistance(updatedDistance);
  }, []);

  return (
    <>
      <div className="container-fluid gallery-img-container">
        <img
          src={Restaurant_img}
          alt=""
          className="col-12  img-fluid card-img"
        />
        <div className="row absolute-container container-fluid justify-content-between p-0">
          <div className="col-md-6  col-lg-5 d-flex justify-content-center align-items-center  height-full color-text-gallery">
            <div className="d-flex flex-column">
              <div className="restaurant-name mb-2">
                {details.restaurantName}
              </div>
              <div className="restaurant-type mb-2">
                North Indian | South Indian | Chineese
              </div>
              <div className="d-inline-flex align-items-center mb-2">
                <span>
                  <img src={walker} alt="" />
                  <img src={walker} alt="" />
                  <img src={walker} alt="" />
                  <img src={walker} alt="" />
                  <img src={walkerDull} alt="" />
                </span>
                <span style={{ marginLeft: 8 }}>{distance} Km</span>
              </div>
              <div className="d-inline-flex align-items-center mb-2">
                <span>
                  <img src={star} alt="" />
                </span>
                <span style={{ marginLeft: 8 }}>{details.rating}</span>
              </div>
              <div className="mb-2">{details.totalReviews}+ Rating</div>
            </div>
          </div>
          <div className="col-md-6 col-md-5 d-flex justify-content-center align-items-center height-full">
            <div className="offer-box d-flex flex-column">
              <div
                className="d-flex justify-content-start"
                style={{ padding: 10 }}
              >
                <div className="offer-heading">OFFER</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestoBack;
