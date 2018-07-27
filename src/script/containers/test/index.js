import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { _Post } from '../../utils/request'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mes: {
        msg: 'sdsd'
      },
      data: {
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
                background: 'red',
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
              data: {
                key: 'one'
              },
              text: 'div1',
              children: {
                0: {
                  el: 'p',
                  class: ['title'],
                  data: {
                    key: 'two'
                  },
                  children: {
                    0: {
                      el: 'span',
                      class: ['text'],
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
                  data: {
                    key: 'three'
                  },
                }
              }
            }
          }
    
        }
      }
    }
  }

  build () {
    const params = new URLSearchParams()

    params.append('data', JSON.stringify(this.state.data))
    _Post('/api/build', params).then(res => {
      console.log(res.data)
    })
  }

  render() {
    return (<div>
      <p onClick={() => {
        console.log(this.props.home)
      }}>About</p>
      <p>{this.state.mes.msg}</p>
    </div>)
  }
}

View.propTypes = {
}
export default connect(state => ({
  home: state.home,
}))(View)