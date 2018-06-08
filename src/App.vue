<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import store from './vuex/vuex'

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  store,
  name: 'App',
  components: {
  }
})
export default class App extends Vue {
  app: any = this.$store.state.AppVuex
  local: any = this.$store.state.LocalVuex
  msg:String = 'Welcome to my Vue.js App'

  created () {
    // console.log(this.app)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
