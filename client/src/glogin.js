
function attachSignin(element) {
  auth2.attachClickHandler(
    element,
    {},
    function(googleUser) {
      const { id_token } = googleUser.getAuthResponse();

      axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
          id_token,
          type: 'google',
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
          vm.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    function(error) {
      console.log(error);
    }
  );
}