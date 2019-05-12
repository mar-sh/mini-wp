const routes = [
  { 
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/search/:tag',
    name: 'search',
    component: search,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/draft',
    name: 'draft',
    component: draft,
    children: [
      {
        path:':id',
        name: 'edit',
        component: write,
      }
    ]
  },
  {
    path: '/published',
    name: 'published',
    component: published,
  },
  {
    path: '/write',
    name: 'write',
    component: write,
  },
  {
    path: '/articles/:id/:slug',
    name: 'articles',
    component: articles,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.fullPath === '/register' || to.fullPath === '/login')  {
    if(localStorage.getItem('token')) {
      return alertify.error("You,ve already logged in")
    } else 
     next();
  }  else if( to.name === 'articles' || to.path === '/' ){
    next();
  }
  else if(!localStorage.getItem('token')) {
    alertify.error('Please login first')
    next('/login');
  } else {
     next();
  }
});
