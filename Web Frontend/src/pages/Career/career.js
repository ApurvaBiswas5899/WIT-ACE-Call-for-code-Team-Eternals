import { useState } from 'react';
import background from './Images/Career-page-1.png';
import facebook_logo from './Images/facebook.png';
import instagram_logo from './Images/instagram.png';
import twitter_logo from './Images/twitter.png';
import linkedin_logo from './Images/linkedin.png';
import BurppLogo from './Images/Burpp_logo_white.png';
import './career.css';

import { FormFeedback, Input } from 'reactstrap';

function Career() {
  //regerx for email
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');

  // for validation
  const [checkName, setCheckName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkFile, setCheckFile] = useState(false);

  const handleFile = (event) => {
    //for uploading file

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
        setCheckFile(false);
      }
    };

    if (event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let decision = true;

    if (!name) {
      setCheckName(true);
      decision = false;
    }

    if (!lastName) {
      setCheckLastName(true);
      decision = false;
    }

    if (phone.length < 10) {
      setCheckPhone(true);
      decision = false;
    }

    if (!re.test(email)) {
      setCheckEmail(true);
      decision = false;
    }

    if (!file) {
      setCheckFile(true);
      decision = false;
    }

    if (!decision) return;

    alert('hello');
  };

  return (
    <div>
      {/* <div className="card bg-dark text-white" style={{ position: "relative" }}>
                <img className="card-img" src={altBackground} alt="Card image" />
                <div className="card-img-overlay" >
                    <div className="card-title Main-header" style={{ width: '300px' }}>
                        <img className="my-3" src={BurppLogo} />
                        <p className="my-3">Let's build something great together:)</p>
                    </div>
                </div>
            </div> */}
      {/* <div style={{ backgroundImage: `url(${background})`, height: '100vh', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className="Main-header">
                    Let's build something great together:)
                </div>
            </div> */}
      <img src={background} height="100%" width="100%" /> {/* Ok */}
      <div style={{ backgroundColor: '#410B76' }}>
        <div className="Contact-header">Tell us more about you!</div>
        <div className="d-flex justify-content-center">
          <form
            style={{ width: '55%', maxWidth: '800px' }}
            onSubmit={submitHandler}
            id="career-form"
            className="needs-validation"
            noValidate
          >
            <div className="py-3" style={{ width: '100%' }}>
              <text className="Input-head" style={{ fontWeight: 'bold' }}>
                Personal details
              </text>

              <div
                className="d-flex justify-content-between"
                style={{ width: '100%' }}
              >
                <div style={{ width: '49%' }}>
                  <p className="Input-head">First Name</p>
                  <Input
                    value={name}
                    type="text"
                    className="Input-small form-control"
                    invalid={checkName}
                    onChange={({ target }) => {
                      setName(target.value);
                      setCheckName(false);
                    }}
                  />
                  <FormFeedback>Please enter first name</FormFeedback>
                </div>

                <div style={{ width: '49%' }}>
                  <p className="Input-head">Last Name</p>
                  <Input
                    type="text"
                    className="Input-small"
                    invalid={checkName}
                    onChange={({ target }) => {
                      setLastName(target.value);
                      setCheckLastName(false);
                    }}
                  />
                  <FormFeedback>Please enter last name</FormFeedback>
                </div>
              </div>

              <div style={{ width: '100%' }}>
                <p className="Input-head">Phone No.</p>
                <Input
                  type="number"
                  className="Input-wide"
                  invalid={checkPhone}
                  onChange={({ target }) => {
                    setPhone(target.value);
                    setCheckPhone(false);
                  }}
                />
                <FormFeedback>Please enter 10 digit phone number</FormFeedback>
              </div>

              <div>
                <p className="Input-head">Email ID</p>
                <Input
                  type="text"
                  className="Input-wide"
                  invalid={checkEmail}
                  onChange={({ target }) => {
                    setEmail(target.value);
                    setCheckEmail(false);
                  }}
                />
                <FormFeedback>Please enter valid email address</FormFeedback>
              </div>
            </div>

            <div className="py-3">
              <text className="Input-head" style={{ fontWeight: 'bold' }}>
                Work details
              </text>

              <div>
                <p className="Input-head">Which team would you like to join?</p>

                <input type="text" className="Input-wide" />
              </div>
              <div>
                <p className="Input-head">How much experience do you have?</p>

                <input type="text" className="Input-wide" />
              </div>
              <div>
                <p className="Input-head">Upload your CV</p>

                <Input
                  type="file"
                  className="Input-wide"
                  onChange={handleFile}
                  invalid={checkFile}
                />
                <FormFeedback>Please select your CV</FormFeedback>
              </div>
            </div>
            <div className="py-3">
              <text className="Input-head" style={{ fontWeight: 'bold' }}>
                Just a few more questions to know you better
              </text>
              <div>
                <p className="Input-head">What makes you unique?</p>

                <input type="text" className="Input-big" />
              </div>
              <div>
                <p className="Input-head">Why do you want to join Burpp</p>

                <input type="text" className="Input-big" />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center py-3">
          <button
            type="submit"
            className="Submit-button"
            style={{ width: '55%', maxWidth: '800px' }}
            form="career-form"
          >
            Send application
          </button>
        </div>
        <div className="py-3 py-md-4 text-center">
          <text className="follow-career">Follow us to stay updated</text>
          <div style={{ paddingTop: '2%' }}>
            <img src={facebook_logo} alt="Facebook" className="Logo" />
            <img src={instagram_logo} alt="Instagram" className="Logo" />
            <img src={twitter_logo} alt="Twitter" className="Logo" />
            <img src={linkedin_logo} alt="LinkedIn" className="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Career;
