const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');
const Article = require('../models/Article');
const { verifyAccessToken } = require('../helpers/token');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const loginMethod = (req, res, next) => {
  if(req.body.type === 'google') {
    const { id_token } = req.body;

    client.verifyIdToken({
      idToken: id_token,
      audience : process.env.GOOGLE_CLIENT_ID,
    })
      .then((response) => {
        req.googleUser = response.getPayload();
        console.trace(req.googleUser);
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else if(req.body.type === 'regular') {
    next();
  } else {
    next(new Error('We can\'t verify your request'));
  };
};

const userAuthentication = (req, res, next) => {
  if(req.headers.hasOwnProperty('authorization')) {
    const decode = verifyAccessToken(req.headers.authorization);
    User.findById(decode.id)
    .then((user) => {
      if(user) {
        req.authenticated = decode;
        return next();
      } else {
        throw new Error('User not found');
      };
    })
    .catch((error) => {
      next(error);
    });
  } else {
    next('Bad request');
  };
};

const articleOwnership = (req, res, next) => {
  const { id } = req.params;

  Article.findById(id)
    .then((article) => {
      if(article && article.userId == req.authenticated.id) {
        next();
      } else {
        next('Unauthorized');
      }
    })
    .catch((error) => {
      next(error);
    })
};

module.exports = {
  loginMethod,
  userAuthentication,
  articleOwnership,
}
