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
    case 'project_path':
      return res = {
        type: 'PROJECT_PATH',
        data: obj,
      }
    default:
      res = { }
  }
  return res
}