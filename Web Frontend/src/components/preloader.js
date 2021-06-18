import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Preloader() {
  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="d-block">
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
          <div
            className="spinner-grow text-secondary mx-1"
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
