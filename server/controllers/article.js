const Article = require('../models/Article');

class ArticleController {

  static postCreateArticle(req, res, next) {
    const userId =  req.authenticated.id 
    const {
      title,
      body,
      tags,
      author,
      published,
    } = req.body;
    const url = req.file ? req.file.cloudStoragePublicUrl : '';
    
    const newArticle = new Article({
      title,
      body,
      url,
      tags: tags.split(','),
      author,
      published,
      userId,
    });

    newArticle.save()
      .then((post) => {
        res.status(201).json({
          message: 'CREATED',
          post,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static getArticlesByQueries(req, res, next) {
    let queries = {};

    for(let key in req.query){
      queries[key] = req.query[key];
    };

    Article.find(queries)
      .then((posts) => {
        res.status(200).json({
          message: 'FETCHED',
          posts,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static getSearchedArticles(req, res, next) {
    let { 
      title, 
      author,
      tag,
    } = req.query;
    let queries = {};

    if( title || author || tag ){ 
        title = new RegExp(`${title}`);
        author = new RegExp(`${author}`);
        tag = new RegExp(`${tag}`);
        queries = { $or: [
          { 'title' : { $regex: title , $options: 'ig' } },
          { 'author' :{ $regex: author , $options: 'ig' } },
          { 'tags' : { $regex: tag, $options: 'ig' } },
        ]};
    };
    
    if(req.query.published) {
      queries.published = req.query.published;
    } else if (req.query.userId) {
      queries.userId = req.queryuserId;
    }

    Article.find(queries)
      .then((posts) => {
        res.status(200).json({
          message: 'FETCHED',
          posts,
        });
      })
      .catch((error) => {
        next(error);
      })
  };

  static getArticleBySlug(req, res, next) {
    const { 
      id,
      slug 
    } = req.params;

    Article.findOne({ 
      slug, 
      _id: id,
    })
      .then((post) => {
        res.status(200).json({
          message: 'FETCHED',
          post,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static getArticleById(req, res, next) {
    const { id } = req.params;
    
    Article.findById(id)
      .then((post) => {
        res.status(200).json({
          message: 'FETCHED',
          post,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static putEditArticlesById(req, res, next) {
    const { id } = req.params;
    const userId =  req.authenticated.id ;
    const url = req.file ? req.file.cloudStoragePublicUrl : req.body.imageUrl;
    const {
      title,
      body,
      tags,
      author,
      published,
    } = req.body;

    console.log(tags);
    
    const updated = {
      title,
      body,
      url,
      tags: tags.split(','),
      author,
      published,
      userId,
    };

    Article.findByIdAndUpdate(id, updated,  { new: true, runValidators: true })
      .then((post) => {
        res.status(200).json({
          message: 'UPDATED',
          post,
        });
      })
      .catch((error) => {
        next(error);
      });

  };

  static deleteArticleById(req, res, next) {
    const { id } = req.params;

    Article.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: 'DELETED' });
      })
      .catch((error) => {
        next(error);
      });
  };

}; 

module.exports = ArticleController;