import React from 'react';
import axios from 'axios';

import { API_ROOT } from '../../utils/url';

import { Button } from 'react-bootstrap';

const Confirm = () => {
  const payHandler = async () => {
    const orderData = JSON.stringify({
      total: '5000',
      foodItems: {
        foodItemIds: ['607902476f7c8a001596df82'],
        foodItemQtys: ['1'],
      },
      paymentMode: 'razorpay',
      userID: '604b6d9e385f2b32945e52cb',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { data } = await axios.post(
      `${API_ROOT}/api/onlinePayment/order`,
      orderData,
      config
    );

    console.log('response', data);
    console.log('id', data.razorpay_order_id);

    var options = {
      key: 'rzp_test_wHeKhLFCmgfWbe', // Enter the Key ID generated from the Dashboard
      amount: '5000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Harsh test',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.razorpay_order_id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        console.log('res', response);
      },
      prefill: {
        name: 'Harsh',
        email: 'harshv521@gmail.com',
        contact: '9560926075',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new Razorpay(options);
    await rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    await rzp1.open();
  };

  return (
    <div className="mx-auto w-50">
      <Button className="btn btn-success" onClick={payHandler}>
        Pay using RazorPay
      </Button>
    </div>
  );
};

export default Confirm;
