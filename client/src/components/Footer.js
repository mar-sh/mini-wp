Vue.component('appfooter', {
  template: `
    <div>
      <v-footer class="pa-3" app>
      <v-spacer></v-spacer>
      <div>&copy; Hacktiv8 MWP {{ new Date().getFullYear() }}</div>
      </v-footer>
    </div>
  `,
})