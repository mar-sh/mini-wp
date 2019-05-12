const crypto = require('crypto');

const User = require('../models/User');
const { createAccessToken } = require('../helpers/token');
const { verifyPassword } = require('../helpers/entry');

class EntryController {

  static postRegister(req, res, next) {
    const {
      username,
      email,
      password,
    } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    newUser.save()
      .then((user) => {
        const accessToken = createAccessToken({
          id: user._id,
          email: user.email,
        });

        res.status(201).json({
          message: 'Welcome to MWP',
          token: accessToken,
          currentUser: {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        next(error);
      })
  };
  
  static postUserLogin(req, res, next) {
    if(req.googleUser) {
      const {
        email,
        name,
      } = req.googleUser;
      
      console.log(req.googleUser);

      User.findOne({ email }) 
        .then((user) => {
          if(user) {
            const accessToken = createAccessToken({
              id: user._id,
              email: user.email,
            });

            res.status(200).json({
              message: 'Welcome to MWP',
              token: accessToken,
              currentUser: {
                userId: user._id,
                username: user.username,
                email: user.email,
              },
            });
          } else {
              const username = name;
              const password = crypto.randomBytes(4).toString('hex');
              const newUser = new User({
                username,
                email,
                password,
              });

              newUser.save()
              .then((user) => {
                const accessToken = createAccessToken({
                  id: user._id,
                  email: user.email,
                });
    
                res.status(200).json({
                  message: 'Welcome to MWP',
                  token: accessToken,
                  currentUser: {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                  },
                });
              });
          };
        })
        .catch((error) => {
          next(error);
        });
    } else {
      const {
        email,
        password,
      } = req.body;
  
      User.findOne({ email })
        .then((user) => {
          if(user && verifyPassword(password, user.password)) {
            const accessToken = createAccessToken({
              id: user._id,
              email: user.email,
            });

            res.status(200).json({
              message: 'Welcome to MWP',
              token: accessToken,
              currentUser: {
                userId: user._id,
                username: user.username,
                email: user.email,
              },
            });
          } else {
            throw new Error('Wrong email/password');
          };
        })
        .catch((error) => {
          next(error);
        });
    };
  };

};



module.exports = EntryController;
