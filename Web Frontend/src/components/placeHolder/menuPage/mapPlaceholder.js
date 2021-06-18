import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 272,
    width: 204,
    padding: 20,
    margin: 'auto',
    boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)',

    [theme.breakpoints.down(1200)]: {
      width: '70%',
    },
    [theme.breakpoints.down(576)]: {
      width: '80%',
    },
  },
  placeHolderImage: {
    margin: 'auto',
    marginTop: 20,
    width: '100%',

    [theme.breakpoints.down(1200)]: {
      width: '80%',
    },
    [theme.breakpoints.down(576)]: {
      width: '100%',
    },
  },
  placeholderContainer: {
    margin: 'auto',
    width: '100%',

    [theme.breakpoints.between('sm', 'md')]: {
      paddingLeft: '10%',
    },
  },
}));

const MapPlaceholder = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.placeholderContainer}>
        <div>
          <Skeleton variant="text" width={100} height={15} />
        </div>
        <div>
          <Skeleton variant="text" width={160} height={10} />
        </div>
        <div>
          <Skeleton variant="text" width={100} height={15} />
        </div>
        <div>
          <Skeleton variant="text" width={160} height={10} />
        </div>
      </div>
      <div className={classes.placeHolderImage}>
        <Skeleton variant="rect" width={'100%'} height={100} />
      </div>
    </div>
  );
};

export default MapPlaceholder;
