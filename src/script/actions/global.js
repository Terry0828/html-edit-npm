export default (type, obj) => {
  let res = {}
  switch (type) {
    case 'view':
      return res = {
        type: 'VIEW_SIZE',
        data: obj,
      }
    case 'project':
      return res = {
        type: 'PROJECT_INFO',
        data: obj,
      }
    default:
      res = { }
  }
  return res
}