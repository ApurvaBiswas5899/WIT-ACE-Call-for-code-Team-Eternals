import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { updateFilter } from '../../actions/views/filter';
import Footer from '../../components/footer/Footer.js';
import AltNavHomepage from '../../components/headerHomepage/headerHomepage.js';
import defaultRestaurantImageNonVeg from '../../components/images/NonVeg-Back-2.png';
import defaultRestaurantImageVeg from '../../components/images/Veg-Back-2.png';
import PhoneView from '../../components/placeHolder/homepage/mobile.js';
import MyLoader from '../../components/placeHolder/homepage/desktop.js';
import SearchIcon from '../images/SearchIcon.png';
import './homepage.css';
import Start from './stars.svg';

//metadata
import MetaData from '../../utils/metaData';

// const navbarPlaceHolder = () => (
//   <ContentLoader
//     width={450}
//     height={400}
//     viewBox="0 0 450 400"
//     backgroundColor="#f0f0f0"
//     foregroundColor="#dedede"
//   >
//     <rect x="10" s y="10" rx="10" ry="10" width="430" height="217" />
//   </ContentLoader>
// );

function Homepage(props) {
  const [userLongitude, setUserLongitude] = useState('-70');
  const [userLatitude, setUserLatitude] = useState('40');
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleveg, settoggleveg] = useState(0);
  const [togglenonveg, settogglenonveg] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  // var userID = props.user._id;
  console.log(props, 'props');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // alert(`${position.coords.latitude}`)
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });
    let veg = 0;

    if (togglenonveg == 1 && toggleveg == 0) {
      veg = 2;
    } else if (toggleveg == 1 && togglenonveg == 0) {
      veg = 1;
    }

    props.actions
      .updateFilter('true', '1', veg, userLatitude, userLongitude)
      .then((result) => {
        if (result.success) {
          setIsLoaded(true);
        }
      });

    // setTimeout(() => {
    //     display(result.restaurants)
    // }, 1000);

    // var getCurrentTime = new Promise(function (resolve, reject) {
    //     setTimeout(() => {
    //         setRestDisplay(result.restaurants)
    //         // resolve(console.log(restDisplay))
    //     }, 1500)
    // })
  }, [toggleveg, togglenonveg]);
  window.addEventListener('resize', () => setWidth(window.innerWidth)); // resize event register in window object
  // console.log(width, "width");
  return (
    <>
      <MetaData
        title={'Home'}
        description={
          'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.'
        }
      />
      <div id="homePage">
        <AltNavHomepage />
        <div
          className="searchDiv d-flex justify-content-center"
          style={{ position: 'relative' }}
        >
          <div
            className="d-flex w-75 bg-white form-group has-search"
            style={{
              height: '40px',
              borderRadius: '10px',
              position: 'absolute',
              top: '20%',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <span className="form-control-feedback">
              <img src={SearchIcon} />
            </span>

            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>

        <>
          {' '}
          <div className="cards__container">
            <div className="toggle__menu">
              <h2
                className="heading__of__food__sections"
                style={{ fontWeight: '700' }}
              >
                Meals near you
              </h2>
              <div className="toggle__veg__nonveg">
                <span
                  style={{
                    color: toggleveg == 1 ? '#198754' : '#212529',
                    cursor: 'pointer',
                    opacity: '0.7',
                  }}
                  onClick={() => {
                    settoggleveg(!toggleveg);
                  }}
                >
                  {' '}
                  Veg
                </span>
                <span> | </span>
                <span
                  style={{
                    color: togglenonveg == 1 ? '#dc3545' : '#212529',
                    cursor: 'pointer',
                    opacity: '0.7',
                  }}
                  onClick={() => {
                    settogglenonveg(!togglenonveg);
                  }}
                >
                  {' '}
                  Non-Veg
                </span>
              </div>
            </div>
            {isLoaded === false ? (
              <>{width > 600 ? <MyLoader /> : <PhoneView />}</>
            ) : (
              <div className="restingrid ">
                {
                  // homeRest
                  props.restaurants.map((rest) => {
                    return (
                      <Link
                        to={`/menualt/${rest._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card style={{ width: '17.9rem' }} className="c">
                          <Card.Body>
                            {rest.images.length ? (
                              <Card.Img
                                style={{ width: '250px', height: '200px' }}
                                src={rest.images[0]}
                                alt="e"
                                className="i"
                              />
                            ) : (
                              <Card.Img
                                style={{ width: '250px', height: '200px' }}
                                src={
                                  togglenonveg == 1 || toggleveg == 0
                                    ? defaultRestaurantImageNonVeg
                                    : defaultRestaurantImageVeg
                                }
                                alt="e"
                                className="i"
                              />
                            )}
                            <div
                              className="card__flex__space__between"
                              style={{ width: '250px', marginTop: '3px' }}
                            >
                              <Card.Title
                                style={{
                                  fontSize: '0.9rem',
                                  color: '#292A40',
                                }}
                              >
                                {rest.restaurantName}
                              </Card.Title>
                              <Card.Text
                                style={{
                                  color: '#FF5454',
                                  fontSize: '0.7rem',
                                }}
                              >
                                700 m
                              </Card.Text>
                            </div>
                            <div
                              className="card__flex__space__between"
                              style={{ width: '250px' }}
                            >
                              <Card.Title
                                style={{
                                  fontSize: '0.75rem',
                                  color: '#3C3F52',
                                }}
                              >
                                {rest.description}
                              </Card.Title>

                              <div className="rating">
                                <img
                                  className={'star'}
                                  src={`${Start}`}
                                  alt="rating"
                                />
                                <Card.Text
                                  style={{
                                    color: '#FFF',
                                    fontSize: '0.7rem',
                                  }}
                                >
                                  {rest.rating}
                                </Card.Text>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })
                }
              </div>
            )}
          </div>
          <Fade bottom>
            <Footer />
          </Fade>
        </>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.filter.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updateFilter,
        // restaurantDetails,
      },
      dispatch
    ),
  };
};
// window.addEventListener("beforeunload", () => {
//   const now = new Data();
//   // Production code would also be considerate of localStorage size limitations
//   // and would do a LRU cache eviction to maintain sanity on storage.
//   // There should also be a way to clear this data when the user signs out
//   window.localStorage.setItem(
//     `lastKnown_${window.location.href}`,
//     JSON.stringify({
//       conditions: {
//         userId: userID,
//         expiry: now.getTime() + 1000 * 30, //30sec expiry time
//       },
//       data: document.getElementById("homePage").innerHTML,
//     })
//   );
// });
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
