import React from "react";
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';
import burppCoin from './images/burppCoin.png';
import FaceImg from './images/happyMe.png';

import vertical from './images/vertical.jpg';

function UserPoints() {
  return (
    <>

      <img src={vertical} alt="Error" className="col-12 col-md-4 col-lg-3 px-3" />

      {/* 
      <div className="col-12 col-md-4 col-lg-3 px-3">
        <div className="rounded-border-1 px-0 mx-0">
          <img src={FaceImg} style={{ width: "100%", height: "26vh" }} />
          <div className="contanier-fluid coin-details d-flex justify-content-center">
            <div>
              <p className="m-0">Burpp Credits</p>
              <div className="">
                <Image src={burppCoin} className="d-inline pb-2" fluid />
                <h3 className="text-white mx-1 pb-0 d-inline">Coming Soon..</h3>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ul>
              <li className="mx-2"><p className="mx-2">Earn Points at each meal.</p></li>
              <li className="mx-2"><p className="mx-2">Redeem the Credits next time you place an order from Burpp </p> </li>
            </ul>
          </div>
          <div style={{ height: "18vh" }}></div>
        </div>
      </div> */}
    </>
  );
}

export default UserPoints;