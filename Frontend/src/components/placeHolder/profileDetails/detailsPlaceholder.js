import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsPlaceholder = () => {
  return (
    <>
      <div className="row container-md p-0 mx-2">
        <div className="col-4 col-md-3 d-flex justify-content-end">
          <Skeleton variant="circle" width={57} height={57} />
        </div>
        <div className="col-8 col-md-9">
          <div className="row">
            <div className="col-7 col-md-6 d-flex d-flex flex-column">
              <h3 className="profile-heading-color profile-heading-size m-0">
                <Skeleton variant="text" width={100} height={15} />
              </h3>
              <div className="d-flex flex-row flex-wrap profile-subheading-size profile-subheading-color">
                <Skeleton variant="text" width={160} height={10} />
              </div>
            </div>
            <div className="col-5 col-md-6 d-flex justify-content-center p-0">
              <Skeleton variant="rect" width={26} height={26} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPlaceholder;
