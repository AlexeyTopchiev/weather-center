<template>
  <div id="app">
    <div class="container">
    <h1>{{city}}</h1>
    <h2 class="temp">{{ Math.floor(temp - 273.15) }}</h2>
      <input v-model="currentValue" @keyup.enter="getWeather" />
      <div class="button" @click="getWeather">Отправить</div>
      <div class="users-wrapper">
        <div class="user-info" v-for="(user, index) in userInfo" :key="index">
          <div class="first-name">{{ user.first_name }}</div>
          <div class="last-name">{{ user.last_name }}</div>
          <div class="id">{{ user.id }}</div>
          <img class="avatar" :src="user.avatar" />
        </div>
      </div>
        <div class="button" @click="getUserInfo"></div>
    </div>
    <div class="yandex">
      <yandex-map 
        :coords="[marker.lat, marker.lng]"
        zoom="17"
        style="width: 100%; height: 600px;"
        :scroll-zoom="false"
        
      >

        <ymap-marker 
          marker-id="1"
          marker-type="placemark"
          :coords="[marker.lat, marker.lng]"
          hint-content="Hint content 1"
          :balloon="{header: 'header', body: 'body', footer: 'footer'}"
          :icon="{layout: 'default#image', imageHref: markerIcon, imageSize: [60, 60], imageOffset: [-22, -55]}"
          cluster-name="1"
        ></ymap-marker>

      </yandex-map>
    </div>
  </div>
</template>

<script>
import markerImage from './assets/marker.png'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'


export default {
  name: 'app',

  components: {
    yandexMap, 
    ymapMarker
  },

  data() {
    return {
      markerIcon: markerImage,
      currentValue: null,
      city: '',
      temp: '',
      marker: {
        lat: null,
        lng: null
      },
      
       placemarks: [
      {
        coords: [54.8, 39.8],
        properties: {}, // define properties here
        options: {}, // define options here
        clusterName: "1",
        balloonTemplate: '<div>"Your custom template"</div>'
        // callbacks: { click: function() {} }
      }
    ],
    userInfo: []
    }
  },

  mounted () {
  this.$getLocation()
    .then(coords => {
      // console.log('111111111', coords)
      return coords
    }).then((locate) => { 
      console.log('getLocation', locate)
      const {lat, lng} = locate
      this.marker = { lat, lng }
      return this.$http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=30ebc50f631af7988b69008c0a7f8bda`)
    }).then((response) => {
      console.log('getLocation2', response)
      this.city = response.body.name
      this.temp = response.body.main.temp
    })
  },

  methods: {
    getWeather() {
      return this.$http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.currentValue}&appid=30ebc50f631af7988b69008c0a7f8bda`)
      .then((response) => {
        console.log('getWeather', response)
        this.city = response.body.name
        this.temp = response.body.main.temp
      })
    },
    getUserInfo() {
      console.log("getUserInfo")
      this.$http.get('https://reqres.in/api/users?page=2').then(response => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@', response)
        this.userInfo = response.body.data
        // return response
      }).then(() => this.getUserID())
    },

    getUserID() {
      this.userInfo.map((user) => {
        return this.$http.post('https://reqres.in/api/users', { name: user.first_name, })
        .then(response => {
          console.log('getUserID', response)
      }) 
    // get status
    response.status;

    // get status text
    response.statusText;

    // get 'Expires' header
    response.headers.get('Expires');

    // get body data
    this.someData = response.body;

  }, response => {
    // error callback
  });

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
  /* max-width: 425px;
  min-height: 667px; */
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

.users-wrapper {
  display: flex;
}

.user-info {
  margin-right: 10px;
}
</style>
