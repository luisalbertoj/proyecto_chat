/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
module.exports = {
  //Login function
  login: function(req, res){
        User.findOne({username: req.param('username')}).exec(function(err, user){
            if(err) return cb(err);
            if(!user) return cb(null, false, {message: 'Usernaaame not found'});
                req.login(user, function(err){
                    if (err) return console.log(err);
                    sails.log('User '+ user.id +' has logged in.');
                    return res.send({user: user});
                })
            })
    },
  //Logout function
  logout: function(req, res) {
      req.logout();
      return res.send(true);
  },


  //Register function
  register: function(req, res){
    //TODO: form validation here

    data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        foto: 'icons/chico.svg'
    }
    console.log(data);

    User.create(data).fetch().exec(function(err, user){
        if (err) return res.negotiate(err);
        console.log(user);

        //TODO: Maybe send confirmation email to the user before login
        req.login(user, function(err){
            if (err) return res.negotiate(err);
            sails.log('User '+ user.id +' has logged in.');
            return res.send({user: user});
        })
    })

  }

};

