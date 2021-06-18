//REACT
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from './utils/url.js';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

//PAGES
import Homepage from './pages/homepage/homepage.js';
import CartPage from './pages/cartPage/cartPage.js';
import SignUp from './pages/Signuppage/Signup.js';
import Login from './pages/loginPage/loginPage.js';
import Review from './pages/review/reviews.js';
import Career from './pages/Career/career.js';
import Partner from './pages/partner/partner';

import RestaurantPage from './pages/menuPage/RestaurantPage';
import Profile from './pages/profilePage/profile';

//privateroutes
import PrivateRoutes from './utils/privateRoutes';

//CSS
import './App.css';
import { Home } from '@material-ui/icons';

import { useSelector } from 'react-redux';

function App() {
  const { _id } = useSelector((state) => state.user);

  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    const preCheck = async () => {
      try {
        const id = {
          restaurantID: '60538f1de4f84e0015472155',
        };

        const { data } = await axios.post(
          `${API_ROOT}/api/food_item/getFood_items`,
          id
        );

        console.log('data', data);
        if (data.success) {
          setMaintenance(false);
        }
      } catch (err) {
        console.log('site error', err);
        setMaintenance(true);
      }
    };
    preCheck();
  }, []);

  return (
    <>
      {maintenance ? (
        <h1>Under Maintenance</h1>
      ) : (
        <>
          {console.log('done')}
          <Container fluid style={{ padding: '0px' }}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/home" component={Homepage} />
                {/* <Route exact path="/readmore" component={Review} /> */}
                <Route exact path="/menualt/:id" component={RestaurantPage} />
                <Route exact path="/profile" component={Profile} />
                <PrivateRoutes path="/partner" component={Partner} id={_id} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signUp" component={SignUp} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/career" component={Career} />
                <PrivateRoutes path="/cart" component={CartPage} id={_id} />
                <Route component={Homepage} />
              </Switch>
            </BrowserRouter>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
