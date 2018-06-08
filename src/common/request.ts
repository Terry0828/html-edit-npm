import axios from 'axios'

class Request {
  public _Get (url, params: object = {}) {
    return axios.get(url, { params }).then((res) => res).catch(err => console.log(err))
  }
  public _Post (url, params: object = {}) {
    return axios.post(url, params).then((res) => res).catch(err => console.log(err))
  }
  public _All (arr) {
    return axios.all(arr).then((res) => res).catch(err => console.log(err))
  }
}

export default new Request()
