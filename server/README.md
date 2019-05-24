## endpoint


### Entry

---
```
POST /register (user register)
  request: { 
    body: {
      username: string,
      email: string (type: email),
      password: string,
    }
  }

  response: {
    status: 201,
    accessToken: jwt,
    currentUser: {
      userId,
      username,
      userEmail,
    }
  }

POST /login (user login)
  request: {
    body: {
      email: string,
      password: string,
      type: string ( google || regular),
      id_token: google token(if type === google)
    }
  }

  response: {
    status: 200,
    accessToken: jwt,
    currentUser: {
      userId,
      username,
      userEmail,
    }
  }
```
### Articles
___
```
POST /articles (create article)
  request: {
     body:{
        userId = ObjId,
        title: string,
        body: string(html),
        tags: Array of tags,
        author: string
        published: string('true' || 'false')
        url: string
     }
     file: {
       image: multipart/form-data
     }
     headers: {
       Authorization: jwt,
     }
  }

  response: {
    status: 201,
    post: {
      _id: ObjId,
      slug: slug(from title),
      userId = ObjId,
      title: string,
      body: string(html),
      tags: Array of tags,
      author: string
      published: string('true' || 'false')
      url: string
    }
  }

GET /articles (get articles by queries)
  request: {
    params/query: {
      published,
      userId,
    }
  }

  response: {
    status: 200,
    posts: [{post}, {post}, ...]
  }

GET /articles/search (find articles by keywords(tag, author, title))
  request: {
    params/query: {
      author,
      tag,
      title,
      userId,
      published,
    }
  }

  response: {
    status: 200,
    posts: [{post}, {post}, ...]
  }

GET /articles/:id/:slug (find article by id and slug)
  request: {
    params: {
      id,
      slug,
    }
  }

  response: {
    status:200,
    post: {...}
  }

GET /articles/:id (find article by id)
  request: {
    params: {
      id,
    }
    headers: {
      Authorization: jwt
    }
  }

  response: {
    status: 200,
    post: {...}
  }

PUT /articles/:id (edit an article)
  request: {
    body: {
      userId = ObjId,
      title: string,
      body: string(html),
      tags: Array of tags,
      author: string
      published: string('true' || 'false')
      url: string
    }
     file: {
       image: multipart/form-data
     }
     headers: {
       Authorization: jwt,
     }
  }

  response: {
    status:200,
    post: {...}
  }

DELETE /articles/:id (delete an article)
  request: {
    params: {
      id
    },
    headers: {
      Authorization: jwt
    }
  }
  response: {
    no content
  }

```

### Misc
___
```
POST /users/content/image (wysiwyg image upload)
  request: {
    file: multipart/form-data
  }

  response: {
    url: gcs link
  }

```
