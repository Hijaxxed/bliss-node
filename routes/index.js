var express = require('express');
var router = express.Router();

title = 'Lethargic Bliss';

/* Mongoose */

var mongoose = require('mongoose');

var User = require('./mongooseSchema/user');
//mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds261088.mlab.com:61088/lethargic-bliss');


mongoose.connect('mongodb://hijaxxed:Roga3272@ds261088.mlab.com:61088/lethargic-bliss', function (err) {
 
   if (err) throw err;
 
   console.log('Database intial connection successful');


  //  var peepUser = new User({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: {
  //       firstName: 'Lil',
  //       lastName: 'God'
  //   },
  //   description: 'I am dead.',
  // });

  // peepUser.save(function(err) {
  //     if (err) throw err;
      
  //     console.log('User successfully saved.');
  // });

//   User.findById('5aa1a8cdd3d2b63bdcbc607e', function(err, result) {
//     if (err) throw err;
    
//     console.log(result.name.firstName)

// });

 mongoose.disconnect();
});






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title});
});

router.get('/ph', function(req, res, next) {
  res.render('ph', { title});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title});
});


router.get('/ex', function(req, res, next) {
  res.render('devex', {title});
});






router.get('/database', function(req,res,next){

  mongoose.connect('mongodb://hijaxxed:Roga3272@ds261088.mlab.com:61088/lethargic-bliss', function(err, results){
    if (err) throw err;
    var tableName = {};

    console.log('Database successfully connected');

    User.find( {} , function(err, result) {
      

      console.log('Sending result to render')

      res.render('database', {users: result});
      
    }) // User.find
  }); //mongoose.connect
}); //router.get

//table#dbtable 8| > 9| each person in persons 10| tr#person_list_item 11| td #{person.firstName} 12| td #{person.lastName} Cannot read property 'length' of undefined

router.post('/form', (req, res) => {
  db.collection('test').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log(req.body)
    console.log('saved to database')

    db.close()
    res.redirect('/')
  })
})





module.exports = router;
