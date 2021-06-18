import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './profile.css'

const Support = () => {
  return (
    <>
      <div>
        <h1 className="form-heading-color form-heading-size">HAVE A QUERY?</h1>
        <h1 className="form-heading-color form-heading-size">
          WE ARE HERE TO ASSIST YOU!
        </h1>
      </div>

      <div className="my-3">
        <Form>
          <FormGroup>
            <Label for="exampleEmail form-subheading-size form-subheading-color">
              Subject
            </Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              className="my-1 input-color"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleText form-subheading-size form-subheading-color">
              Details
            </Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              rows="7"
              className="my-1 input-color"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </FormGroup>
        </Form>
        <div className="d-flex justify-content-center my-4">
          <Button className=" btn-success  button-send">Send</Button>
        </div>
      </div>
    </>
  );
};

export default Support;
