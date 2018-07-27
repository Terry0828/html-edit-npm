export default (type, obj) => {
  const res = {}
  switch (type) {
    case 'view':
      res = {
        type: 'VIEW_SIZE',
        data: obj,
      }
    default:
      res = { }
  }

  return res
}