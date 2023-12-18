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


router.post('/url',fetchUser, async(req,res) =>{
    try{

        const {mainlink} = req.body;
        const userId = req.id;
        const id = shortid.generate(4);
        const url = new Url({
            mainlink,
            shortlink: id,
            User: userId
        })

        const savedurl = await url.save()
        res.status(200).json(`${process.env.URL}/${savedurl.shortlink}`)


    }catch(error){
        console.log(error)
    }
})

router.get('/:shortlink', async(req,res) =>{
    const {shortlink} = req.params;
    const url = await Url.findOne({shortlink})

    try{

        if(url){
            res.redirect(url.mainlink)
        }

       

    }catch(error){
        console.log(error)
    }
})

module.exports = router;