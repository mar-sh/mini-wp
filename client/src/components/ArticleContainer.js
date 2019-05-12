Vue.component('article-container', {
  template: `
       <v-flex xs12>
            <v-card>
        <v-img
          :src="article.url"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ article.title }}</div>
            <div class="grey--text ml-1">By {{ article.author }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="info" @click.prevent=readArticle v-show="publishStatus" >Read full Article</v-btn>
          <v-btn flat color="warning" @click=goEditDraft(article._id) v-show="!publishStatus" >Edit Article</v-btn>
          <v-btn flat color="error"@click.prevent="deleteArticle(article._id)" v-show="deleteButton" >Delete Article</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text  v-show="show">
            <div class="text-truncate text-wrap py-1 px-1"  v-html = "truncatedBody"></div>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
      </v-flex>
  `,
  props: {
    article: {
      type: Object,
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    readArticle() {
      this.$router.replace({ name: 'articles', params: { id: this.article._id, slug: this.article.slug } });
    },
    goEditDraft(id) {
     this.$emit('edit-draft', id);
    },
    deleteArticle(id){
      alertify.confirm("Are you sure you want to discard the content of this post ?",
      () =>  {
        axios({
          method: 'DELETE',
          url: `http://localhost:3000/articles/${id}`,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
          .then(({  }) => {
            this.$emit('article-delete', id);
                if(this.$route.name === 'edit' && this.$route.params.id) {
                  this.$router.replace({ name: 'draft' });
                }
              alertify.success('Deleted');
          })
          .catch((error) => {
            alertify.error('Something went wrong!');
            console.log(error);
          });
      },
      function(){
        alertify.success('Canceled');
      });
 
    },
  },
  computed: {
    truncatedBody() {
      return `${this.article.body.split('.')[0]}...`;
    },
    deleteButton() {
      return (this.article.userId === localStorage.getItem('userId'));
    },
    publishStatus(){
      return (this.article.published === 'true');
    },
  },
})