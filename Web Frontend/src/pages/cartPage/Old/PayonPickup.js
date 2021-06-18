import { React } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postOrder } from '../../../actions/views/order.js';

function PayonPickup(props) {

    // console.log(props.cart);

    return (

        <div className="rounded-border bg-white mt-4 py-3  my-border">

            <div className="my-5 mx-4 d-flex justify-content-center">

                {/* onClick={() => { props.actions.postOrder(props.allDetails.userID, props.allDetails.restaurantID, props.allDetails.total, props.allDetails.updated, props.allDetails.created, props.allDetails.paymentMode, props.allDetails.paymentSuccess, props.allDetails.consumedFood, props.allDetails.completed, props.allDetails.foodItems) }} */}

                <a onClick={() => { props.actions.postOrder(props.allDetails.userID, props.allDetails.restaurantID, props.allDetails.total, props.allDetails.updated, props.allDetails.created, props.allDetails.paymentMode, props.allDetails.paymentSuccess, props.allDetails.consumedFood, props.allDetails.completed, props.allDetails.foodItems) }}
                    class="dropdown-btn text-decoration-none py-1 payBtnpickup text-white" href="#" role="link" aria-haspopup="true" aria-expanded="false">
                    Pay On Pickup
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.order.foodItems,
        allDetails: state.order,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            postOrder,
        }, dispatch),
    };
}

export default connect(mapStateToProps,
    mapDispatchToProps)(PayonPickup);