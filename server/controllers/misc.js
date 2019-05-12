const User = require('../models/User');
const Article = require('../models/Article');

class MainController {
  static postCreateImageUrl(req, res, next) {
    console.trace(req.file);
    let image = '';
    if(req.file.cloudStoragePublicUrl) {
      image = req.file.cloudStoragePublicUrl;
      res.send(image);
    } else {
      next('Image not Found');
    };
  };

  static getAllTags(req, res, next) {
    Article.find({ published: 'true' })
      .then((posts) => {
   
        let tags = [];
        posts.forEach((post) => {
          tags = tags.concat([...post.tags[0].split(',')]);
        });
        tags = tags.filter((tag, idx) => tags.indexOf(tag) === idx);
        res.status(200).json({
          message: 'FETCHED',
          tags,
        });
      })
      .catch((error) => {
        next(error);
      });
  };
}

module.exports = MainController;