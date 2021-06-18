import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

// const useStyles = makeStyles((theme) => ({}));

const FoodItemPlaceholder = () => {
  return (
    <>
      <div className="row  border-bottom my-4 border-box">
        <div className="col-3 col-sm-2  mb-2">
          <Skeleton variant="circle" width={50} height={50} />
        </div>
        <div className="col-8 col-sm-10 d-flex flex-column mx-xs-2">
          <div>
            <Skeleton variant="text" width={100} height={15} />
          </div>
          <div>
            <Skeleton variant="text" width={160} height={10} />
          </div>
        </div>
      </div>
      <div className="row  border-bottom my-4 border-box">
        <div className="col-3 col-sm-2  mb-2">
          <Skeleton variant="circle" width={50} height={50} />
        </div>
        <div className="col-8 col-sm-10 d-flex flex-column mx-xs-2">
          <div>
            <Skeleton variant="text" width={100} height={15} />
          </div>
          <div>
            <Skeleton variant="text" width={160} height={10} />
          </div>
        </div>
      </div>
      <div className="row  border-bottom my-4 border-box">
        <div className="col-3 col-sm-2  mb-2">
          <Skeleton variant="circle" width={50} height={50} />
        </div>
        <div className="col-8 col-sm-10 d-flex flex-column mx-xs-2">
          <div>
            <Skeleton variant="text" width={100} height={15} />
          </div>
          <div>
            <Skeleton variant="text" width={160} height={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItemPlaceholder;
