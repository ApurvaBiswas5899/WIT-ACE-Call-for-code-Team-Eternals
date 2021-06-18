import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

const CartItemPlaceholder = () => {
  return (
    <div className="row cart-controls my-2">
      <div className="col-4">
        <div className="mb-3">
          <Skeleton variant="circle" width={45} height={45} />
        </div>
      </div>

      <div className="col-4 cart-text small-screen-padding">
        <Skeleton variant="text" width={'70%'} height={15} />
      </div>

      <div className="col-4 small-screen-padding ">
        <Skeleton variant="text" width={'70%'} height={15} />
      </div>
    </div>
  );
};

export default CartItemPlaceholder;
