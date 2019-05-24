Vue.component('search-bar', {
  template: `
  <v-flex xs12></v-flex>

    <v-toolbar
      dense
      floating
      light
      depressed
    >
      <v-text-field
        v-model="keyword"
        @keyup.enter="goSearch"
        hide-details
        single-line
        placeholder="tags, title, or author.."
        full-width
        @keyup.enter="goSearch"
      >
      </v-text-field>
      <v-btn icon small @click.prevent="goSearch">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  </v-flex>
  `,
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    goSearch() {
      this.$emit('get-search', this.keyword);
      this.keyword = '';
    },
  },
});