<template>
  <div class="home">
    <el-button type="primary" @click="add">生成</el-button>
    <el-button type="primary" @click="zip">压缩</el-button>
    <el-button type="primary" @click="build">填充 Html</el-button>
    <div id="jsoneditor">
    </div>
    <el-button type="primary" @click="test">Babel</el-button>
    
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
  data: any = {
    config: {
      mobile: 'pc', // app 会渲染 rem 适配代码
      title: '测试',
      desc: '1111111',
      key: ''
    },
    link: {
      style: ['./animated.css', 'http://baidu.com/index.css'],
      js: ['./test.js', '//medis.com/index.js'],
    },
    data: {
      layout: {
        0: {
          el: 'div',
          class: ['wrap'],
          attr: {
            id: '',
            name: '',
            value: '',
          },
          other: '',
          data: {
            key: 'one'
          },
          text: 'div1',
          children: {
            0: {
              el: 'p',
              class: ['title'],
              attr: {
                id: '',
                name: '',
                value: '',
              },
              other: '',
              data: {
                key: 'two'
              },
              text: '',
              children: {
                0: {
                  el: 'span',
                  class: ['text'],
                  attr: {
                    id: '',
                    name: '',
                    value: '',
                  },
                  other: '',
                  data: {
                    key: 'span'
                  },
                  text: 'span-text'
                }
              }
            },
            1: {
              el: 'img',
              class: ['content'],
              attr: {
                id: '',
                name: '',
                value: '',
              },
              other: '',
              data: {
                key: 'three'
              },
              text: ''
            }
          }
        }
      },
      style: `
        body { color: yellow;background: blue; }
      `,
      // style: {d
      //   body: {
      //     color: '',
      //   }
      // },
      js: `console.log('sda');
      var absolutt = 0;
      var b = 0;`
    }
  }

  created () {
  }
  mounted () {
  }

  add () {
    const params = new URLSearchParams()

    console.log(this.data)
    console.log(JSON.stringify(this.data))

    params.append('html', JSON.stringify(this.data))
    Fetch._Post('/api/add', params)
  }

  test () {
    const params = new URLSearchParams()
    console.log(JSON.stringify(this.data.data))
    params.append('html', JSON.stringify(this.data.data.layout))
    Fetch._Post('/api/test', params).then(res => console.log(res))
  }

  zip () {
    Fetch._Post('/api/zip')
  }
  build () {
    const params = new URLSearchParams()

    params.append('html', JSON.stringify(this.data))
    Fetch._Post('/api/build', params)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/index';
.hello {
  color: #787878;
}
.json-edit-box {
  width: 90%;
  margin: 0 auto;
}
</style>
