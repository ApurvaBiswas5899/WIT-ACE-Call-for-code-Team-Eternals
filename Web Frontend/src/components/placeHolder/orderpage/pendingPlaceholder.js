import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PendingPlaceholder = () => {
  return (
    <>
      <div className="orders__page">
        <div className="orders__page__heading">
          <p className="orders__page__heading--text">PENDING PICKUP</p>
        </div>
        <div className="details">
          <div className="order__restaurant__image__container">
            <Skeleton variant="rect" width={150} height={120} />
          </div>
          <div className="top__section">
            <div className="orders__restaurant">
              <div className="orders__restaurant__name">
                {/* {props.restaurantDetails.restaurantName} */}
                <Skeleton variant="text" width={100} height={15} />
              </div>
              <div className="orders__restaurant__timing">
                <Skeleton variant="text" width={160} height={10} />
              </div>
            </div>

            <div className="order__cancel__button">
              <Button
                className="cancel__button"
                style={{
                  background: '#E3E3E3',
                  color: '#ffffff',
                  borderColor: '#E3E3E3',
                }}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
        <div className="current__orders__container">
          <div className="order__item__container">
            <div className="cart__item">
              <div className="d-flex flex-row w-100 my-2 justify-content-between">
                <Skeleton variant="circle" width={30} height={30} />
                <Skeleton variant="text" width={'50%'} height={15} />
              </div>
            </div>
            <div className="cart__item">
              <div className="d-flex flex-row w-100 my-2 justify-content-between">
                <Skeleton variant="circle" width={30} height={30} />
                <Skeleton variant="text" width={'50%'} height={15} />
              </div>
            </div>
            <div className="cart__item">
              <div className="d-flex flex-row w-100 my-2 justify-content-between">
                <Skeleton variant="circle" width={30} height={30} />
                <Skeleton variant="text" width={'50%'} height={15} />
              </div>
            </div>
          </div>

          <div className="bill__detail">
            <div className="heading">Bill Details</div>
            <div className="item__total">
              <Skeleton variant="text" width={'100%'} height={15} />
            </div>
            <div className="item__total">
              <Skeleton variant="text" width={'100%'} height={15} />
            </div>
            <div className="tax">
              <Skeleton variant="text" width={'100%'} height={15} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingPlaceholder;
