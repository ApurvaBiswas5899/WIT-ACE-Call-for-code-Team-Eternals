import { React } from "react";
import { Link } from "react-router-dom";
import paytm from "./images/Paytm.png";
import paypal from "./images/Paypal.png";
import payu from "./images/Payu.png";
import razorpay from "./images/Razorpay.png";
import { Image } from 'react-bootstrap';

function OnlinePayment() {

    return (
        <div className="rounded-border bg-white mt-4 py-3  my-border">
            <div className="d-flex justify-content-center mt-3 p-3 ">
                <p>Payment-Gateway</p>
            </div>
            <div className="d-flex justify-content-center p-2">
                <Link to="#">
                    <Image src={paytm} fluid />
                </Link>
            </div>
            <div className="d-flex justify-content-center p-2">
                <Link to="#">
                    <Image src={paypal} fluid />
                </Link>
            </div>
            <div className="d-flex justify-content-center p-2">
                <Link to="#">
                    <Image src={payu} fluid />
                </Link>
            </div>
            <div className="d-flex justify-content-center p-2">
                <Link to="#">
                    <Image src={razorpay} fluid />
                </Link>
            </div>

            <div className="my-5 mx-4 d-flex justify-content-center">
                <a class="dropdown-btn text-decoration-none py-1 payBtn text-white" href="#" role="link" aria-haspopup="true" aria-expanded="false">
                    Continue
                                    </a>

            </div>

        </div>
    );
}
export default OnlinePayment;