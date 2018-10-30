const express = require('express');
const app = express();
const port = 3000;
const apiRouter = require('./routes/apiRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
var async = require('async');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.options('*', cors()) 




app.use('/api', apiRouter);




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/allhomes_db')
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));



app.use(function(req, res, next)
{
   /* Allow access from any requesting client */
   res.setHeader('Access-Control-Allow-Origin', '*');

   /* Allow access for any of the following Http request types */
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

   /* Set the Http request header */
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
 });


 function sendEmail(to, subject, content){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nkennannadi@gmail.com',
        pass: 'nkenna007'
      }
    });
    
    var mailOptions = {
      from: 'nkennannadi@gmail.com',
      to: to,
      subject: subject,
      text: content
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  }

  

app.listen(port, function(){
  console.log('Server started');
});


app.use(express.static('public'));