Vue.component("navbar", {
  template: `
   <div>
    <v-toolbar flat class="blue-grey lighten-4" app clipped-left>
      <v-toolbar-title @click.prevent="goHome" style="cursor: pointer">MWP</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click.prevent="goWrite" v-if="isLoggedIn">Write New</v-btn>
      <v-btn flat @click.prevent="goRegister" v-if="!isLoggedIn">Register</v-btn>
      <v-btn flat @click.prevent="goLogin" v-if="!isLoggedIn">Login</v-btn>
      <v-btn flat @click.prevent="userLogout" v-if="isLoggedIn">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>   
  `,
  mixins: [mixin],
  data() {
    return {
      
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    EventBus.$on('logged-in', (payload) => {
      this.isLoggedIn = payload.state;
    });
    EventBus.$on('logged-out', (payload) => {
      this.isLoggedIn = payload;
    });
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: 'register' });
    },
    goWrite() {
      this.$router.push({ name: 'write' });
    },
    userLogout(){
      console.log(gapi)
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        EventBus.$emit('logged-out', false);
        this.isLoggedIn = false;
        localStorage.clear();
        alertify.success('Bye, See you soon!');
        this.$router.push({ name: 'login' });
      });
    },
  },
},);
