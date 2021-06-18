import React from 'react';

//images
import coinBack from './images/coinBack.png';
import friendImage from './images/friendImage.png';
import earnImage from './images/earnImage.png';
import bulkImage from './images/bulkImage.png';
import history1 from './images/history1.svg';
import history2 from './images/history2.svg';
import history3 from './images/history3.svg';
import coinBlack from './images/coinblack.svg';

const Coin = () => {
  return (
    <>
      <div className="d-flex flex-column coin-background mx-auto">
        <div className="coin-image-wrapper">
          <img src={coinBack} alt="" className="coin-image-size" />
        </div>
        <div className="d-flex flex-row flex-wrap mb-3 justify-content-center negative-margin credit-info-container">
          <div className="coin-info-div mx-2 my-2">
            <img src={friendImage} alt="" className="coin-image-size" />
          </div>
          <div className="coin-info-div mx-2 my-2">
            <img src={earnImage} alt="" className="coin-image-size" />
          </div>
          <div className="coin-info-div mx-2 my-2">
            <img src={bulkImage} alt="" className="coin-image-size" />
          </div>
        </div>
        <div className="container">
          <div className="row flex-md-row flex-column-reverse">
            <div className=" col-md-5  d-flex flex-column align-items-center">
              <div className="coin-history-div my-2 d-flex flex-column align-items-center">
                <div className="coin-subheading-color coin-subheading-size my-1">
                  Burpp customer since
                </div>
                <div className="my-1">
                  <span className="coin-dynamic-history">28</span>
                  <span className="coin-content-color coin-content-size">
                    days
                  </span>
                </div>
                <div className="my-1" style={{ height: 70, width: 110 }}>
                  <img src={history1} alt="" />
                </div>
              </div>
              <div className="coin-history-div my-2  d-flex flex-column align-items-center">
                <div className="coin-subheading-color coin-subheading-size my-1">
                  Amount of food you saved
                </div>
                <div className="my-1">
                  <span className="coin-dynamic-history">500</span>
                  <span className="coin-content-color coin-content-size">
                    g
                  </span>
                </div>
                <div className="my-1" style={{ height: 70, width: 110 }}>
                  <img src={history2} alt="" />
                </div>
              </div>
              <div className="coin-history-div my-2  d-flex flex-column align-items-center">
                <div className="coin-subheading-color coin-subheading-size my-1">
                  You reduced Greenhouse Emission by
                </div>
                <div className="my-1">
                  <span className="coin-dynamic-history">0.0002</span>
                  <span className="coin-content-color coin-content-size">
                    %
                  </span>
                </div>
                <div className="my-1" style={{ height: 70, width: 60 }}>
                  <img src={history3} alt="" />
                </div>
              </div>
            </div>
            <div className=" col-md-7  d-flex flex-column align-items-center">
              <h4>Burpp Coins History</h4>
              <div className="container">
                <div className="row my-3 py-1 border-bottom">
                  <div className="col-8  d-flex flex-column align-items-start coin-subheading-color coin-dynamic-date">
                    <div>Order from Qwerty Hotel on</div>
                    <div>26 Jan,2021</div>
                  </div>
                  <div className="col-4  d-flex flex-row align-items-center justify-content-end">
                    <div className="coin-subheading-color coin-heading-size">
                      +20
                    </div>
                    <div>
                      <img
                        src={coinBlack}
                        alt="coin"
                        className=" mx-2"
                        style={{ height: 25, width: 22 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-3 py-1 border-bottom">
                  <div className="col-8  d-flex flex-column align-items-start coin-subheading-color coin-dynamic-date">
                    <div>Order from Qwerty Hotel on</div>
                    <div>26 Jan,2021</div>
                  </div>
                  <div className="col-4  d-flex flex-row align-items-center justify-content-end">
                    <div className="coin-subheading-color coin-heading-size">
                      +20
                    </div>
                    <div>
                      <img
                        src={coinBlack}
                        alt="coin"
                        className=" mx-2"
                        style={{ height: 25, width: 22 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-3 py-1 border-bottom">
                  <div className="col-8  d-flex flex-column align-items-start coin-subheading-color coin-dynamic-date">
                    <div>Order from Qwerty Hotel on</div>
                    <div>26 Jan,2021</div>
                  </div>
                  <div className="col-4  d-flex flex-row align-items-center justify-content-end">
                    <div className="coin-subheading-color coin-heading-size">
                      +20
                    </div>
                    <div>
                      <img
                        src={coinBlack}
                        alt="coin"
                        className=" mx-2"
                        style={{ height: 25, width: 22 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-3 py-1 border-bottom">
                  <div className="col-8  d-flex flex-column align-items-start coin-subheading-color coin-dynamic-date">
                    <div>Order from Qwerty Hotel on</div>
                    <div>26 Jan,2021</div>
                  </div>
                  <div className="col-4  d-flex flex-row align-items-center justify-content-end">
                    <div className="coin-subheading-color coin-heading-size">
                      +20
                    </div>
                    <div>
                      <img
                        src={coinBlack}
                        alt="coin"
                        className=" mx-2"
                        style={{ height: 25, width: 22 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
