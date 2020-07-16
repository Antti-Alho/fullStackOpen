import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import style from './index.css'

ReactDOM.render(
  <Provider store={store}>
    <App style={style}/>
  </Provider>,
  document.getElementById('root')
)