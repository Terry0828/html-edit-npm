<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common';
.Shape {
  height: 55px;
  background: $B_color_top;
}
</style>

<template>
  <div class="Shape">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Shape',
  components: {
  }
})
export default class Shape extends Vue {
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
