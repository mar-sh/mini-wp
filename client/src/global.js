const EventBus = new Vue();
const baseUrl = `https://api-mwp.demarsh.dev`;
const mixin = {
  data() {
    return {
      isLoggedIn: false,
      userEmail: '',
    };
  },
  methods: {
    checkLogin() {
      if(localStorage.getItem('token')) {
        this.isLoggedIn = true;
        this.userEmail = localStorage.getItem('userEmail');
      } else {
        this.isLoggedIn = false;
      };
    },
  },
}

function startApp() {
  gapi.load("auth2", function() {
    auth2 = gapi.auth2.init({
      client_id:
        "719300865364-acu631ns5i9gvsaqeuf5epfautmd5n5l.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin"
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById("customBtn"));
  });
}
