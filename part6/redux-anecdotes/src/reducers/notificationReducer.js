let lastNotificationID

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default: return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
    })
    if (lastNotificationID) {
      clearTimeout(lastNotificationID)
    }
    lastNotificationID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: '',
      })
    }, time * 1000)
  }
}


export default reducer
