const login = Vue.component('login', {
  template: `
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
         <v-toolbar  color="blue-grey lighten-4">
          <v-toolbar-title class="justify-center">LOGIN</v-toolbar-title>
            <v-spacer></v-spacer>
         </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" prepend-icon="email" name="email" label="email" type="email"></v-text-field>
            <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="userLogin" color="blue-grey lighten-4" style="width:100%">Login</v-btn>
        </v-card-actions>
        <div class="text-xs-center">OR</div>
        <v-card-actions>
        <v-spacer></v-spacer>
        
        <div id="gSignInWrapper"/>
        <div id="customBtn" style="width:100%" class="customGPlusSignIn">
          <div id="google-icon" class="text-xs-center center-block"><i class="fab fa-lg fa-google"></i>
          <span  id="google-text">Sign in with Google</span>
            </div> 
        </div>
      </div>
      </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
  `,
  mixins: [mixin],
   data() {
    return {
      email: '',
      password: '',
    };
  },
  created() {
    startApp();
  },
  methods: {
    userLogin() {
      axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
          email: this.email,
          password: this.password,
          type: 'regular',
        },
      })
      .then(({ data }) => {   
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.currentUser.userId);
        localStorage.setItem('username', data.currentUser.username);
        localStorage.setItem('userEmail', data.currentUser.email);
        EventBus.$emit('logged-in', {
          state: true,
          userEmail: localStorage.getItem('userEmail'),
          userId: localStorage.getItem('userId')
        });
        alertify.success('Welcome to MWP');
        this.$router.replace({ name: 'home' });
      })
      .catch((error) => {
        console.log(error);
      })
    },
  },
})