<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common';
.edit {
  width: 320px;
  height: 568px;
  margin: 0 auto;
  background: #fff;
}
</style>

<template>
  <div class="edit">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Edit',
  components: {
  }
})
export default class Edit extends Vue {
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
