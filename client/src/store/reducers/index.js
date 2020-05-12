import { combineReducers } from 'redux'

import auth from './auth'
import error from './error'
import { messages, currentMessage } from './messages'

export default combineReducers({
    auth,
    error,
    messages,
    currentMessage
})