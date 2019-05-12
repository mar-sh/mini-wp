const draft = Vue.component('draft', {
  template: `
    <v-container wrap fluid >
        <router-view :article="article" @published-draft="filterDraft" @edited-draft="getArticleDrafts">
        </router-view>
      <h2 class="text-xs-center display-1">Unfinished Drafts</h2>
      <hr>
      <search-bar @get-search="getSearchedItems"></search-bar>
      <div v-if="!articles.length ">
        <p class="text-xs-center subheading">This page seems to be empty. Start writing some articles</p>
      </div>
      <div  v-if="!searched.length > 0">
      <v-container grid-list-md  v-for="(article, index) in  articles" :key="article._id">
        <article-container :article="article" @edit-draft="editDraft" @article-delete="filterDeleted" ></article-container>
      </v-container>
      </div >
      <div v-else > 
      <v-container  grid-list-md  v-for="(article, index) in  searched" :key="article._id">
        <article-container :article="article" @edit-draft="editDraft" @article-delete="filterDeleted" ></article-container>
      </v-container>
      </div>
    </v-container>
  `,
  
  data() {
    return {
      articles: [],
      article: {},
      searched: [],
    };
  },
  created() {
    this.getArticleDrafts();
    this.getDraft(this.$route.params.id);
  },
  methods: {
    getArticleDrafts() {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles?userId=${localStorage.getItem('userId')}&published=false`,
      })
        .then(({ data }) => {
          this.articles = [...data.posts];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDraft(id){
      axios({
        method: 'GET',
        url: `${baseUrl}/articles/${id}`,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.article = {...data.post};
        })
        .catch((error) => {
          console.log(error);
        })
    },
    editDraft(payload){
      this.getDraft(payload);
      this.$router.push({ name: 'edit', params: { id: payload } });
    },
    filterDeleted(payload) {
      this.articles = this.articles.filter((article) => article._id !== payload);
      this.searched = this.searched.filter((article) => article._id !== payload);
    },
    filterDraft(payload) {
      this.articles = this.articles.filter((article) => article._id !== payload);
      this.searched = this.searched.filter((article) => article._id !== payload);
    },
    getSearchedItems(payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles/search?userId=${localStorage.getItem('userId')}&published=false`,
        params: {
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