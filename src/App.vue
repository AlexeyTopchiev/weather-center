<template>
  <div id="app">
    <div class="container">
    <h1>{{city}}</h1>
    <h2 class="temp">{{ Math.floor(temp - 273.15) }}</h2>
      <input v-model="currentValue" @keyup.enter="getWeather" />
      <div class="button" @click="getWeather">Отправить</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      currentValue: null,
      city: '',
      temp: ''
    }
  },

  mounted () {
  this.$getLocation()
    .then(coords => {
      return coords
    }).then((locate) => { 
      // console.log(locate)
      const {lat, lng} = locate
      return this.$http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=30ebc50f631af7988b69008c0a7f8bda`)
    }).then((response) => {
      console.log('2222222', response)
      this.city = response.body.name
      this.temp = response.body.main.temp
    })
  },

  methods: {
    getWeather() {
      return this.$http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.currentValue}&appid=30ebc50f631af7988b69008c0a7f8bda`)
      .then((response) => {
        console.log('@@@@@@@@@@@', response)
        this.city = response.body.name
        this.temp = response.body.main.temp
      })
    }
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  height: 100vh;
  max-width: 425px;
  min-height: 667px;
  background: #d9c7c7;
  /* padding: 30px; */
}

.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%
}

 .button, input {
  width: 200px;
  padding: 10px;
}

.button {
  background: #544d4d;
  margin-top: 20px;
  color: white;
}

.temp {
  margin-bottom: 15px;
}
</style>
