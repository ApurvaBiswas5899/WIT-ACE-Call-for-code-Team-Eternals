const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

// axios
//     .get('https://localhost:5000/', {
//       timeout: 5000
//     })
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// const request = axios.get('http://localhost:5000/api/users/auth')

function getNumberOfFollowers() {

    let res = axios.get('http://localhost:5000/api/cart');
  
    console.log(`Data: ${res}`)
  }
  
  getNumberOfFollowers();

// console.log(request)


// app.get('https://localhost:5000/api/users/auth' , (req, res) => res.console.log(res))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
