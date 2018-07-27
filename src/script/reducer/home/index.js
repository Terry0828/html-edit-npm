export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        log: 'yes',
        list: action.list || 0
      }
    default:
      return {
        list: 0
      }
  }

  // return {
  //   ...state,
  //   logoInfo: { sta: true },
  //   logo: 'yes'
  // }
}