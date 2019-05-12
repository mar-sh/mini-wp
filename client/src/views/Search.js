const search = Vue.component('search', {
  template: `
    <v-container wrap fluid >
      <h2 class="text-xs-center display-1">Featured Articles</h2>
      <hr>
      <v-container  grid-list-md  v-for="(article, index) in  articles" :key="article._id">
        <article-container :article="article" @article-delete="filterDeleted" ></article-container>
      </v-container>

    </v-container>
  `,
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.getSearchedItems(this.$route.params.tag);
    console.log(this.articles);
  },
  methods: {
    filterDeleted(payload) {
      this.articles = this.articles.filter((article) => article._id !== payload);
    },
    getSearchedItems(tag) {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles/search?published=true`,
        params: {
          tag,
        },
      })
        .then(({ data }) => {
          this.articles = [...data.posts];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});