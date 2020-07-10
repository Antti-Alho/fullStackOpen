let lastNotificationID

const reducer = (state = { message: null, errorStatus: false }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default: return state
  }
}

export const setNotification = (notification, errorStatus) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: notification, errorStatus: errorStatus },
    })
    if (lastNotificationID) {
      clearTimeout(lastNotificationID)
    }
    lastNotificationID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {message: null, errorStatus: false },
      })
    }, 5000)
  }
}


export default reducer
