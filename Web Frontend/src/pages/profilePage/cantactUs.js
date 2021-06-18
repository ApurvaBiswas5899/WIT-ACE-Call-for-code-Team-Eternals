import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';

function ContactUs() {

    return (
        <>
            <div className="mx-auto my-2 px-3 py-2 rounded-lg my-shadow-out border border-light w-100" >
                <form>
                    <div className="form-group">
                        <h4 className="boldest-text">Query Regarding</h4>
                        <input type="email" className="form-control my-shadow-in" />
                    </div>
                    <div class="form-group">
                        <h4 className="boldest-text">Details</h4>
                        <textarea className="form-control my-shadow-in" rows="5"></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn my-3 mx-auto text-white" style={{ backgroundColor: "#03A427", padding: "2px 40px" }}>Send</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ContactUs;