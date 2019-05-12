const home = Vue.component('home', {
  template: `
    <v-container wrap fluid >
      <h2 class="text-xs-center display-1">Featured Articles</h2>
      <hr>
      <search-bar @get-search="getSearchedItems"></search-bar>
      <div  v-if="!searched.length > 0">
      <v-container grid-list-md  v-for="(article, index) in  articles" :key="article._id">
        <article-container :article="article" @article-delete="filterDeleted" ></article-container>
      </v-container>
      </div >
      <div v-else > 
      <v-container  grid-list-md  v-for="(article, index) in  searched" :key="article._id">
        <article-container :article="article" @article-delete="filterDeleted" ></article-container>
      </v-container>
      </div>
    </v-container>
  `,
  data() {
    return {
      articles: [],
      searched: [],
    };
  },
  created() {
    this.getPublishedArticles();
    EventBus.$on('search-for-tag', payload => {
      this.getSearchedItems(payload);
    })
  },
  methods: {
    getPublishedArticles() {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles?published=true`,
      })
        .then(({ data }) => {
          this.articles = [...data.posts];
          this.searched = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterDeleted(payload) {
      this.articles = this.articles.filter((article) => article._id !== payload);
      this.searched = this.searched.filter((article) => article._id !== payload);
    },
    getSearchedItems(payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles/search?published=true`,
        params: {
          author: payload,
          tag: payload,
          title: payload,
        },
      })
        .then(({ data }) => {
          this.searched = [...data.posts];
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
});