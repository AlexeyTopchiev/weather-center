<template>
  <div class="container">
    <div class="first-name"></div>
    <div class="last-name"></div>
    <div class="id"></div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',

  data() {
    return {
      userInfo: {
        firstName: null,
        lastName: null
      }
    }
  },

  methods: {
    getUserInfo() {
       this.$http.get('https://reqres.in/api/users?page=2').then(response => {

        // get body data
        // this.someData = response.body; 
        console.log("22222222", response)

      }, response => {
        // error callback
      });
    }
  }
}
</script>

