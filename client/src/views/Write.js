const write = Vue.component("write", {
  template: `
<v-container fluid>
  <v-layout justify-center>
    <v-flex md10>
      <v-card class="elevation-5">
        <v-toolbar color="blue-grey lighten-4">
        <v-toolbar-title class="justify-center">{{ header }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="title" prepend-icon="title" name="title" label="Title" type="text"></v-text-field>
              
            <v-text-field
                  label="Featured Image"
                  @click="pickFile"
                  v-model="imageName"
                  prepend-icon="add_a_photo"
                ></v-text-field>
                <input
                  type="file"
                  name="image"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                />
            <v-text-field v-model="displayTags" prepend-icon="tag" readonly  outline  name="tags" 
            label="Article Tags" type="text">
            <v-text-field v-model="title" prepend-icon="title" name="title" label="title" type="text"></v-text-field>
            </v-text-field>
            <vue-tags-input placeholder="Input your tags here" class="ml-4 pl-2 mb-4" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
            <wysiwyg v-model=body
              :options="{ image: { uploadURL: 'http://localhost:3000/users/content/image', dropzoneOptions: {} } }"></wysiwyg>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">
        <v-btn color="success" @click.prevent="createArticle('true')"  style="width: calc(33.33% - 20px)">PUBLISH</v-btn>
        <v-btn color="info" @click.prevent="createArticle('false')"  style="width: calc(33.33% - 20px)">{{ saveButton }}</v-btn>
        <v-btn color="error" @click.prevent="discardContent"  style="width: calc(33.33% - 20px)">DISCARD
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
`,
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {
      header: 'WRITE A NEW ARTICLE',
      title: '',
      body: '',
      tag: '',
      tags: [],
      sendTags: [],
      displayTags: [],
      imageName: '',
      imageFile: '',
      imageUrl: '',
      draft: null,
    };
  },
  methods: {  
    publishArticle(){
      console.log('abb')
    },
    createArticle(publish){
      let confirm = '';
      let msg = '';

      if(publish === 'true') {
        confirm = 'Are you sure you want to publish this article? Once you published you cannot edit this article again',
        msg = 'Success!, your article has been published!'
      } else if(publish === 'false') {
        confirm = 'Are you sure with your content ?'
        msg = 'Success, your work has been added as draft'
      }
      if(this.article) {
        
        const data = new FormData();
        this.imageUrl = this.imageFile ? null : this.article.url;
        
        data.append('title', this.title);
        data.append('tags', this.sendTags);
        data.append('body', this.body);
        data.append('published', publish);
        data.append('author', localStorage.getItem('username'));
        data.append('imageUrl', this.imageUrl);
        data.append("image", this.imageFile);


        alertify.confirm(confirm,
        () => {
          axios({
            method: 'PUT',
            url: `http://localhost:3000/articles/${this.article._id}`,
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            },
            data,
          })
            .then(({ data }) => {
              this.title = '';
              this.tags = [];
              this.body = '';
              this.imageName = '';
              this.imageFile = '';
              this.imageUrl = '';
              if(published === 'true') {
                this.$emit('published-draft', this.article._id);
                alertify.success(msg);
              } else {
                this.$emit('edited-draft', this.article._id);
                alertify.success(msg);
              }
              this.$router.replace({ name: 'draft' });
            })
            .catch((error) => {
              alertify.error("Something went wrong when adding article");
              console.log(error)
            });
        },
        function(){
          alertify.success('Ok, take your time');
        }); 
      } else {
        const data = new FormData();

        data.append('title', this.title);
        data.append('tags', this.sendTags);
        data.append('body', this.body);
        data.append('published', publish);
        data.append('author', localStorage.getItem('username'));
        data.append("image", this.imageFile);

        alertify.confirm(confirm,
         () => {
          axios({
            method: 'POST',
            url: 'http://localhost:3000/articles',
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            },
            data,
          })
            .then(({ data }) => {
              this.title = '';
              this.tags = [];
              this.body = '';
              this.imageName = '';
              this.imageFile = '';
              alertify.success(msg);
            })
            .catch((error) => {
              alertify.error("Something went wrong when adding article");
              console.log(error)
            }); 
          },
          function(){
            alertify.success('Ok, take your time');
          });
      };

    },
    discardContent() {
      alertify.confirm("Are you sure you want to discard the content of this post ?",
        () => {
          this.body = '';
          this.title = '';
          this.tags = [];
          this.imageFile = '';
          this.imageName = '';
          alertify.success('Discarded');
        },
        function(){
          alertify.success('Canceled');
        });
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;

      if (files[0] !== undefined) {
        this.imageName = files[0].name;

        if (this.imageName.lastIndexOf(".") <= 0) {
          return "";
        }
        const fr = new FileReader();

        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageFile = files[0];
        
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
      };
    },
  },
  computed: {
    saveButton() {
      return (this.article && this.article.published === 'false' ? 'save' : 'save as draft')
    },
    isDraft() {
      return (this.article && this.article.published === 'false')
    }
  },
  watch: {
    tags() {
      this.sendTags = this.tags.map(tag => tag.text);
      this.displayTags = this.sendTags.join(', ');
    },
    article() {
      this.title = this.article.title;
      this.body = this.article.body;
      this.displayTags = this.article.tags.join(', ');
      this.tags = [...this.article.tags];
      this.sendTags = [...this.tags];
      this.imageName = 'Input your new image if any';
      this.header = 'EDIT DRAFT'
    },
  },
});
