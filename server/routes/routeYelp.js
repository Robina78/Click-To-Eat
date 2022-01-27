const express = require('express');
const router = new express.Router();
const axios = require('axios');
require("dotenv").config();
const queryString = require('query-string');
const app = express();
app.use(express.json());


router.get('/', async function(req, res, next) { 
    
    const query = queryString.stringify({term:req.query.term, location:req.query.location})
      
    const apiOptions = {                     
        headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,           
            Origin: 'localhost',
            withCredentials: true,             
        },               
    };
   
    await axios(`${process.env.BASE_YELP_URL}?${query}`, apiOptions)
         .then(response => res.send(response.data))
         .catch(err => res.send(err));
       
});


module.exports = router;
