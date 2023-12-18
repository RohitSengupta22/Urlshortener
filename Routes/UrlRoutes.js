const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../Schemas/Users.js');
const Url = require('../Schemas/Url.js')
const fetchUser = require('../Middleware/FetchUser.js');
const shortid = require('shortid');

router.get('/url',fetchUser,async(req,res) =>{
    try{

        const userId = req.id;
        const urlForTheUser = await Url.find({User: userId})
        if(!urlForTheUser){
            res.status(404).json({msg: "No urls"})
        }
        res.status(200).json({urlForTheUser})

    }catch(error){

        res.status(400).json({msg: error.body})

    }
})

router.post('/short',fetchUser,async(req,res) =>{
    try{

        const {mainlink} = req.body;
        const id = shortid.generate(4);
        const userId = req.id;

        const savedUrl = new Url({
            mainlink,
            shortid: id,
            User: userId,
            Date: Date.now()

        })

        await savedUrl.save();
        res.status(200).json(`${process.env.URL}/urlshortner/${savedUrl.shortid}`)



    }catch(error){

        res.status(400).json({error: error.message})

    }
})

router.get('/:shortid', async (req, res) => {
    try {
      const { shortid } = req.params;
      const url = await Url.findOne({ shortid: shortid }); // Use findOne instead of find and correct the field name
  
      if (url) {
        res.redirect(url.mainlink);
      } else {
        res.status(404).json({ msg: 'URL not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  


module.exports = router;