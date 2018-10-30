const express = require('express');
const app = express();
const apiRouter = express.Router();
var cors = require('cors');
var async = require('async');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Home = require('../models/homes.model');
const User = require('../models/users.model');
const Donation = require('../models/donations.model');
const Help = require('../models/helps.model');


var token = '111111'; 

apiRouter.options('*', cors()) 

apiRouter.use(function(req, res, next)
{
   /* Allow access from any requesting client */
   res.setHeader('Access-Control-Allow-Origin', '*');

   /* Allow access for any of the following Http request types */
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

   /* Set the Http request header */
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

apiRouter.route('/').get(function (req, res) {
  res.json({status: 'express'})
});



apiRouter.route('/allhomes').get(function(req, res){
    Home.find().exec().then(function(homes){
        res.json({homes: homes})
        console.log('seeeee');
    })
    
    
});

apiRouter.route('/addhome').post(function(req, res){
  

    var title = req.body.title;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var location = req.body.location;
    var state = req.body.state;
    var country = req.body.country;

    Home.create({title: title,
                address: address,
                phone: phone,
                email: email,
                lat: lat,
                lon: lon,
                location: location,
                state: state,
                country: country}, (error, home)=>{
                    if(error){
                        console.log(error);
                        return res.json({status: 'error in saving', code: '0'})
                    }else{
                        res.json({status: 'success', code: '1'})
                    }
                })
    
});

apiRouter.route('/signup').post(function(req, res) {
    var firstname = req.body.firstname;
    var middlename = req.body.middlename;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var location = req.body.location;
    var state = req.body.state;
    var country = req.body.country;
    var nature = req.body.nature;

    var salt = 'steinacoz';

    console.log(3333)
    console.log(nature)

    

    bcrypt.hash(password, null, null, function (error, hash) {
        if(error){
            console.log(error);
            console.log(0000)
            return res.json({error: 'unknown error', status: 0, user: null})
        }else{
            const user = new User({
                firstname: firstname,
                middlename: middlename,
            lastname: lastname,    
            address: address,
            phone: phone,
            email: email,
            password: hash,
            location: location,
            nature: nature,
            state: state,
            country: country
            });

            user.save().then((result) => {
                console.log(result);
                console.log(1111)
                res.json({status: 1, user: user})
            }).catch(error => {
                console.log(error);
                console.log(7777)
                return res.json({error: 'error in saving', status: 0, user: null})
            })
        }
       
    })
})


  



apiRouter.route('/signin').post(function(req, res){
    var tok = req.body.token;

    if(tok == token){
        User.findOne({email: req.body.email}, (err, user)=>{
            if(err){
                console.log('data error');
                return res.json({status: 3})
            }else{
                bcrypt.compare(req.body.password, user.password, (err, result)=>{
                    if(err){
                        console.log('Unauthorized Access');
                        return res.json({status: 0})
                    }else{
                        if(result){
                            return res.json({status: 1, user: user})
                        }
                    }
                })
            }
        })
    }else{

        console.log('invalid token');
        return res.json({status: 2})
    }  
    
 });

 apiRouter.route('/adddonation').post((req, res) => {
     var to = req.body.to;
     var amount = req.body.amount;
     var type = req.body.type;
     var userID = req.body.userid;

     const donation = new Donation({
         to: to,
         amount: amount,
         type: type,
         userid: userID   
     });

     donation.save().then((result) =>{
         console.log(result);
         res.json({donation: result, status: 1})
     }).catch(err => {
         console.log(err);
         res.json({status: 0})
     })
    
 })


 apiRouter.route('/userdonations').get((req, res) =>{
     var userID = req.query.userid;
     var number = 0;

     console.log(userID);
     Donation.count({userid: userID}, (err, count) => {
         if(err){
            console.log(err);
            return;
         }else{
            Donation.find({userid: userID}, (err, donations) =>{
                if(err){
                    console.log(err);
                    return;
                }else{
                    number = count;
                    return res.json({donations: donations, count: number})
                }
            })
         }
     })

     
 })

 apiRouter.route('/helpdonations').get((req, res) =>{
    var helpID = req.query.helpid;
    var number = 0;

    console.log();
    Donation.count({_id: helpID}, (err, count) => {
        if(err){
           console.log(err);
           return;
        }else{
            return res.json({count: number})
        }
    })

    
})



  apiRouter.route('/addhelp').post(function(req, res) {
    var name = req.body.name;
    var note = req.body.note;
    var title = req.body.title;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var location = req.body.location;
    var state = req.body.state;
    var country = req.body.country;
    var info = req.body.info;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;

    var _info = false;

    if(info){
        _info = true;
    }else{
        _info = false;
    }
    

    bcrypt.hash(password, null, null, function (error, hash) {
        if(error){
            console.log(error);
            console.log(0000)
            return res.json({error: 'unknown error', status: 0, help: null})
        }else{
           
            const help = new Help({
            name: name,
            note: note,
            title: title,    
            address: address,
            phone: phone,
            email: email,
            password: hash,
            location: location,
            info: _info,
            state: state,
            country: country,
            startdate: startdate,
            enddate: enddate
            });

            help.save().then((help) => {
                console.log(help);
                console.log(1111)
                res.json({status: 1, help: help})
            }).catch(error => {
                console.log(error);
                console.log(7777)
                return res.json({error: 'error in saving', status: 0, help: null})
            })
        }
       
    })
})

apiRouter.route('/signinhelp').post(function(req, res){
   
    var tok = req.body.token;
    var t = '222222'
    if(tok == t){
        Help.findOne({email: req.body.email}, (err, helpuser)=>{
            if(err){
                console.log('data error');
                return res.json({status: 3})
            }else{

                bcrypt.compare(req.body.password, helpuser.password, (err, result)=>{
                    if(err){
                        console.log('Unauthorized Access');
                        return res.json({status: 0})
                    }else{
                        if(result){
                            return res.json({status: 1, helpuser: helpuser})
                        }
                    }
                })
            }
        })
    }else{

        console.log('invalid token');
        return res.json({status: 2})
    } 
}) 
    




module.exports = apiRouter;