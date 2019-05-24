const articles = Vue.component('articles', {
  template: `
    <v-container>
      <h1 class="display-2">{{ content.title }}</h1>
      <span class="grey--text subheading pl-1"><p>By {{ content.author }}, {{ createdDate }}</p></span>
      <v-container v-html="content.body">
      </v-container>
      <div>
        Like this article ? Share it on:
        <a id="facebook-share" :href="getFacebookHref" target="_blank"><i class="fab fa-facebook-f mx-2"></i></a>
        <a id="twitter-share" class="twitter-share-button" :href="getTwitterHref" target="_blank"><i class="fab fa-twitter"></i></a>
      </div>
      <hr>
      <span>
      Tags: 
        <v-btn small flat depressed @click.prevent="searchByTag(tag)" v-for="tag in content.tags" :key="tag">{{tag}}</v-btn>
      </span>
    </v-container>
  `,
  data() {
    return {
      content: {},
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios({
        method: 'GET',
        url: `${baseUrl}/articles/${this.$route.params.id}/${this.$route.params.slug}`,
      })
      .then(({ data }) => {
        this.content = {...data.post};
      })
      .catch((error) => {
        console.log(error);
      });
    },
    searchByTag(tag){
      EventBus.$emit('search-for-tag', tag);
      this.$router.push({ name: 'search', params: { tag } });
    }
  },
  computed: {
    createdDate() {
      return moment(this.content.createdAt).calendar();
    },
    getFacebookHref (){
      return `https://www.facebook.com/sharer/sharer.php?u=https://mwp.demarsh.dev/%23${this.$route.path}`
    },
    getTwitterHref() {
      return `https://twitter.com/intent/tweet?text=I+just+read+this+awesome+article,+check+it+out+on&amp;url=https://mwp.demarsh.dev/%23${this.$route.path}`
    }
  }

});