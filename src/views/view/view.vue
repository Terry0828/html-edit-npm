<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

<template>
  <div class="view">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Home',
  components: {
  }
})
export default class Home extends Vue {
  app: any = this.$store.state.AppVuex

  created () {
  }
  mounted () {
  }
  _upData(data: any) {
    // 更新 Vuex 数据状态
    this.$store.commit('_appUpData', data)
  }
}
</script>
