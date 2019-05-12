const register = Vue.component('register', {
  template: `
  <v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar  color="blue-grey lighten-4">
          <v-toolbar-title class="justify-center">REGISTER</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="username" prepend-icon="person" name="username" label="username" type="text"></v-text-field>
            <v-text-field v-model="email" prepend-icon="email" name="email" label="email" type="email"></v-text-field>
            <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="userRegister" color="blue-grey lighten-4">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
`,
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    userRegister() {
      axios({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
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