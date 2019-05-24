Vue.component('sidenav', {
  template: `
  <div>
  <v-navigation-drawer permanent app clipped v-if="isLoggedIn" >
  <v-toolbar depressedx d v-show="true">
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">        
            <span class="subheading font-weight-medium">{{ userEmail }}</span>         
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <v-divider></v-divider>

  <v-list dense class="pt-0">
    <v-list-tile
      v-for="item in items"
      :key="item.title"
      @click.stop="item.action"
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
  </div>
`,
mixins: [mixin],
  data() {
    return {
      items: [
        { title: 'Home', 
          icon:'home', 
          action: () => this.$router.push({ name: 'home' } )
        },
        { title: 'Published',
           icon: 'format_align_center',
           action: () => this.$router.push({ name: 'published' }) 
        },
        { title: 'Draft',
           icon: 'edit',
           action: () => this.$router.push({ name: 'draft' })
        },
      ],
      right: null,
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    EventBus.$on('logged-in', (payload) => {
      this.isLoggedIn = payload.state;
      this.userEmail = payload.userEmail;
    });
    EventBus.$on('logged-out', (payload) => {
      this.isLoggedIn = payload;
    });
  },
  methods: {

  },

})