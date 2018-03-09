var express = require('express');
var router = express.Router();

title = 'Lethargic Bliss';

var loggedInUser = null;

/* Mongoose */

var mongoose = require('mongoose');

var User = require('./mongooseSchema/user');




/* GET home page. */
router.get('/', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('index', {title, loggedInUser});
});

router.get('/ph', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('ph', { title, loggedInUser});
});

router.get('/about', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('about', {title, loggedInUser});
});


router.get('/ex', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('devex', {title, loggedInUser});
});






router.get('/database', function(req,res,next){

  mongoose.connect('mongodb://hijaxxed:Roga3272@ds261088.mlab.com:61088/lethargic-bliss', function(err, results){
    if (err) throw err;
    console.log('Database successfully connected');

    User.find( {} , function(err, result) {
      loggedInUser = req.session.user;
      res.render('database', {title, users: result, loggedInUser});

      mongoose.disconnect()
      console.log('MongoDB disconnected')
    }) // User.find
  }); //mongoose.connect
}); //router.get


router.get('/signUp', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('signUp', {title, loggedInUser})

});

router.post('/newUser', (req, res) => {
  mongoose.connect('mongodb://hijaxxed:Roga3272@ds261088.mlab.com:61088/lethargic-bliss', function(err, results){
    if (err) return console.log(err)

    console.log(req.body)
    
   var newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    age: req.body.age,
    description: req.body.description
  });

  newUser.save(function(err) {
      if (err) throw err;
      
      console.log('New user successfully saved.');
  });
    mongoose.disconnect()
    console.log('MongoDB disconnected')
    res.redirect('database')
  })
})

router.get('/login', function(req, res, next) {
  loggedInUser = req.session.user;
  res.render('login', {title, loggedInUser})
});

router.post('/logInUser', function(req, res, next) {
  var exists = false;
  if (req.body.email === '' || req.body.password === '' ){
    res.redirect('/logIn')
  } else { 
    mongoose.connect('mongodb://hijaxxed:Roga3272@ds261088.mlab.com:61088/lethargic-bliss', function(err){
      User.find( {} , function(err, results, fields){   
          //connection.query(`SELECT email FROM Users WHERE email='${req.body.email}'`, function(err, results, fields){

          //console.log(results);  
          var userThere = true;  
          if(err)
            throw err;
    
          for(var i = 0; i < results.length; i++){
            if(req.body.email === results[i].email){
              if(req.body.password === results[i].password){

                  req.session.user = {
                  email : req.body.email, userName : results[i].userName, description : results[i].description
                };
                console.log(req.session.user)
                console.log('User: ' + req.session.user + 'signed in')

                return res.redirect('/');
              } else{
                return res.redirect('/login');
              }
            }
              else{
                userThere = false;
                
              }
          
          }
          if(!userThere)
            console.log('User not found')
            return res.redirect('/login'); 
        }); // end conncetion.query
        mongoose.disconnect()
        console.log('MongoDB disconnected')
      }); // end connection.connect
    } // end else
}); //end router.post

router.get('/signOut', function(req, res, next) {
  req.session.user = null;
  console.log(req.session.user + 'logged out')
  res.redirect('/');
});

router.get('/accountDetails', function(req, res, next) {
  console.log(loggedInUser)
  loggedInUser = req.session.user;
  res.render('accountDetails', {title, loggedInUser})
});


module.exports = router;
