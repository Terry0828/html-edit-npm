<template>
  <div class="home">
    <el-button type="primary" @click="add">生成</el-button>
    <el-button type="primary" @click="zip">压缩</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Fetch from '../../common/request'
import axios from 'axios'

@Component({
  name: 'Home',
  components: {
  }
})
export default class Home extends Vue {
  html: any = {
    0: {
      el: 'div',
      class: 'one',
      text: '第一层',
      child: [
        {
          el: 'p',
          class: 'one-son',
          text: '第二层',
        }
      ]
    },
    1: {
      el: 'div',
      class: 'two',
      text: '第一层',
      child: [
        {
          el: 'span',
          class: 'two-son',
          text: '第二层',
        }
      ]
    },
  }
  created () {
    
  }
  add () {
    let params = new URLSearchParams()

    params.append('html', JSON.stringify(this.html))
    // Fetch._Post('/api/add', params)

    axios.post('/api/add', params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then((res) => res).catch(err => console.log(err))
  }
  zip () {
    Fetch._Get('/api/zip')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/index';
.hello {
  color: #787878;
}
</style>
