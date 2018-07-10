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

<template>
  <div class="home">
    <el-button type="primary" @click="add">生成</el-button>
    <el-button type="primary" @click="zip">压缩</el-button>
    <el-button type="primary" @click="build">生成 page</el-button>

    <div id="jsoneditor">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { _Post } from '../../common/request'
import { _GetHash } from '../../common/utils'

console.log(_GetHash(1))

@Component({
  name: 'Home',
  components: {
  }
})
export default class Home extends Vue {
  data: any = {
    other: {
      index: 0
    },
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
    html: {
      layout: [
        {
          key: '2a96284b',
          children: [
            {
              key: '1a96284b',
              children: [
                {
                  key: '1596284b',
                }
              ]
            },
            {
              key: '4a96284b'
            },
          ]
        }
      ],
      attr: {
        '2a96284b': {
          el: 'div',
          class: ['wrap'],
          attr: {
            id: 'wap1',
          },
          data: {
            key: 'one'
          },
          style: {
            background: 'orange',
            fontWeight: 500
          },
          text: 'div1'
        },
        '1a96284b': {
          el: 'p',
          class: ['title'],
          data: {
            key: 'two'
          },
          text: '测试p',
        },
        '1596284b': {
          el: 'span',
          class: ['text'],
          other: 'data-v',
          data: {
            key: 'span'
          },
          style: {
            color: 'red',
            borderBottom: '1px solid #000'
          },
          text: 'span-text'
        },
        '4a96284b': {
          el: 'img',
          class: ['content'],
          data: {
            key: 'three'
          }
        }
      }
    },
    style: `body { color: yellow;background: blue; }`,
    js: `console.log('sda');
      var absolutt = 0;
      var b = 0;`,
    // old
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
      }

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
    _Post('/api/add', params)
  }

  build () {
    const params = new URLSearchParams()

    params.append('data', JSON.stringify(this.data))
    _Post('/api/build', params).then(res => {
      console.log(res.data)
    })
  }

  zip () {
    _Post('/api/zip')
  }
}
</script>
