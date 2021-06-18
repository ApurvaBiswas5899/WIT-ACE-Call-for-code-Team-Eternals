import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  picHolder: {
    height: 114,
    width: 116,
  },
}));

const GalleryPlaceholder = () => {
  return (
    <div className="row justify-content-center my-2 d-flex flex-row flex-wrap justify-content-around">
      <div className="col-4 picHolder m-2 p-0">
        <Skeleton variant="rect" width={'100%'} height={'100%'} />
      </div>
      <div className="col-4 picHolder m-2 p-0">
        <Skeleton variant="rect" width={'100%'} height={'100%'} />
      </div>
      <div className="col-4 picHolder m-2 p-0">
        <Skeleton variant="rect" width={'100%'} height={'100%'} />
      </div>
    </div>
  );
};

export default GalleryPlaceholder;
