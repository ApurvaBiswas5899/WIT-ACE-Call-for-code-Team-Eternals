import { React, useState, useEffect } from 'react';

//alert
import { useAlert } from 'react-alert';

//header footer
import Header from '../../components/headerHomepage/headerHomepage';
import Footer from '../../components/footer/Footer';

//util
import { API_ROOT } from '../../utils/url';

import 'bootstrap/dist/css/bootstrap.css';
import './partner.css';

//images
import input1 from './images/input1.svg';
import input2 from './images/input2.svg';
import input3 from './images/input3.svg';
import input4 from './images/input4.svg';
import benefit1 from './images/benefit1.svg';
import benefit2 from './images/benefit2.svg';
import benefit3 from './images/benefit3.svg';
import benefit4 from './images/benefit4.svg';
import LowerImage from './images/LowerImage.png';

//bootstrap components
import { Button, Form, FormGroup, FormFeedback } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import axios from 'axios';

//metadata
import MetaData from '../../utils/metaData';

const Partner = () => {
  //regex for email
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const alert = useAlert();
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  //for validation

  const [checkName, setCheckName] = useState(false);
  const [checkBusiness, setCheckBusiness] = useState(false);
  const [checkMobile, setCheckMobile] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const [progress, setProgress] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let decision = true;

      if (name.length < 5) {
        setCheckName(true);
        decision = false;
      }

      if (business.length < 5) {
        setCheckBusiness(true);
        decision = false;
      }

      if (mobile.length < 10) {
        setCheckMobile(true);
        decision = false;
      }

      if (!re.test(email) || email.length < 10) {
        setCheckEmail(true);
        decision = false;
      }

      if (!decision) return;

      const formData = JSON.stringify({
        owner: name,
        business_name: business,
        mobile: mobile,
        mail: email,
        stage: 1,
      });

      setProgress(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let { data } = await axios.post(
        `${API_ROOT}/api/applyRegisterStore/add`,
        formData,
        config
      );

      if (data.success) {
        console.log('success');
        setProgress(false);
        setName('');
        setEmail('');
        setBusiness('');
        setMobile('');
        alert.success('Registration Successful');
      }
    } catch (err) {
      setProgress(false);
      alert.error('Registration Failed');
      console.log('err', err);
    }
  };

  return (
    <>
      <MetaData
        title={'Business with Burpp'}
        description={
          'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.'
        }
      />
      <Header />
      <div className="container d-flex flex-column align-items-center my-3">
        <div className=" partner-heading-form-wrapper d-flex flex-column align-items-center my-4">
          <div className="partner-heading-container">
            LET'S FIGHT <span className="red-color">FOOD WASTE</span> TOGETHER
          </div>
          <div className="partner-form-container mt-5 d-flex flex-column align-items-center">
            <div className="partner-form-heading">
              PARTNER WITH BURPP AND TAKE YOUR FIRST STEP TOWARDS SAVING FOOD
            </div>
            <div className="partner-form-input-container d-flex flex-column align-items-center">
              <Form className="form-style " onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="partner-input-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="partner-input-style border-none">
                        <div>
                          <img
                            src={input1}
                            alt=""
                            style={{ height: 15, width: 15 }}
                          />
                        </div>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={name}
                      placeholder="Name of owner"
                      className="partner-input-style border-none"
                      type="text"
                      onChange={({ target }) => {
                        setName(target.value);
                        setCheckName(false);
                      }}
                      invalid={checkName}
                    />
                    <FormFeedback>
                      Name should have least 5 characters
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="partner-input-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="partner-input-style border-none">
                        <div>
                          <img
                            src={input2}
                            alt=""
                            style={{ height: 15, width: 15 }}
                          />
                        </div>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={business}
                      placeholder="Name of the business"
                      className="partner-input-style border-none"
                      type="text"
                      onChange={({ target }) => {
                        setBusiness(target.value);
                        setCheckBusiness(false);
                      }}
                      invalid={checkBusiness}
                    />
                    <FormFeedback>
                      Business Name should have least 5 characters
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="partner-input-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="partner-input-style border-none">
                        <div>
                          <img
                            src={input3}
                            alt=""
                            style={{ height: 15, width: 15 }}
                          />
                        </div>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={mobile}
                      placeholder="Mobile phone number"
                      className="partner-input-style border-none"
                      type="Number"
                      onChange={({ target }) => {
                        setMobile(target.value);
                        setCheckMobile(false);
                      }}
                      invalid={checkMobile}
                    />
                    <FormFeedback>
                      Please enter 10 digit moile number
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="partner-input-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="partner-input-style border-none">
                        <div>
                          <img
                            src={input4}
                            alt=""
                            style={{ height: 15, width: 15 }}
                          />
                        </div>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={email}
                      placeholder="Email address"
                      className="partner-input-style border-none"
                      type="text" // email
                      onChange={({ target }) => {
                        setEmail(target.value);
                        setCheckEmail(false);
                      }}
                      invalid={checkEmail}
                    />
                    <FormFeedback>
                      Please enter a valid Email address
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <div className="w-100 d-flex flex-column align-items-center">
                  {progress ? (
                    <>
                      <Button
                        className=" btn-success my-3 register-button"
                        type="submit"
                        disabled={progress}
                      >
                        Registering...
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className=" btn-success my-3 register-button"
                        type="submit"
                        disabled={progress}
                      >
                        REGISTER YOUR STORE
                      </Button>
                    </>
                  )}
                </div>
              </Form>
            </div>
          </div>
          <div className="why-partner-container w-100 d-flex flex-column align-items-center my-5">
            <div className="why-partner-heading">Why partner with us?</div>
            <div className="d-flex flex-row flex-wrap  justify-content-around w-100 my-4">
              <div className="d-flex flex-column align-items-center m-2 py-4 why-parter-benefits">
                <img
                  src={benefit1}
                  alt="savefood"
                  style={{ width: 43, height: 65 }}
                  className="my-2"
                />
                <div className="benefit-font-size">Save food</div>
              </div>
              <div className="d-flex flex-column align-items-center m-2 py-4 why-parter-benefits">
                <img
                  src={benefit2}
                  alt="savefood"
                  style={{ width: 56, height: 65 }}
                  className="my-2"
                />
                <div className="benefit-font-size">Easy to use</div>
              </div>
              <div className="d-flex flex-column align-items-center m-2 py-4 why-parter-benefits">
                <img
                  src={benefit3}
                  alt="savefood"
                  style={{ width: 71, height: 65 }}
                  className="my-2"
                />
                <div className="benefit-font-size">earn profit</div>
              </div>
              <div className="d-flex flex-column align-items-center m-2 py-4 why-parter-benefits">
                <img
                  src={benefit4}
                  alt="savefood"
                  style={{ width: 69, height: 65 }}
                  className="my-2"
                />
                <div className="benefit-font-size">New Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container burpp-poster-container">
        <img src={LowerImage} alt="poster" className="w-100 h-100" />
      </div>
      <Footer />
    </>
  );
};

export default Partner;
