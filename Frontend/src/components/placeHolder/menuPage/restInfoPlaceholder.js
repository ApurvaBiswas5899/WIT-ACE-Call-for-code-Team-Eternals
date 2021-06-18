import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

const RestInfoPlaceholder = () => {
  return (
    <div className="container-fluid gallery-img-container-placeholder">
      <Skeleton
        variant="rect"
        width={'100%'}
        height={'100%'}
        animation="wave"
      />
    </div>
  );
};

export default RestInfoPlaceholder;
