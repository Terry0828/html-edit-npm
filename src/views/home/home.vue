<template>
  <div class="home">
    <el-button type="primary" @click="down">生成</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Fetch from '../../common/request'

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
  down () {
    Fetch._Get('/api/download', {html: JSON.stringify(this.html)})
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
