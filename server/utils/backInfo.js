
const Code = {
  0: {
    code: 0,
    message: 'the request is success!'
  },
  1: {
    code: 1,
    message: 'the request is error!'
  },
  10001: {
    code: 10001,
    message: '重复操作！'
  },
}

const getBackData = (type = 0, data = {}, mes = false) => {
  mes ? Code[type].message = mes : void 0
  return {
    ...Code[type],
    data
  }
}

exports._error = getBackData(0, data, mes)
exports._success = getBackData(1, data, mes)
exports._success = getBackData(10001, data, mes)
