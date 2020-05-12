import api from '../../services/api'
import { SET_CURRENT_MESSAGE, SET_MESSAGES } from '../actionTypes'
import { addError, removeError } from './error'

export const setMessages = messages => ({
    type: SET_MESSAGES,
    messages
})

export const setCurrentMessage = message => ({
    type: SET_CURRENT_MESSAGE,
    message
})


export const getMessages = () => {
    return async dispatch => {
        try {
            const messages = await api.call('get', 'message');
            dispatch(setMessages(messages))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}

export const sendMessage = data => {
    return async dispatch => {
        try {
            const message = await api.call('post', 'message', data);
            dispatch(setCurrentMessage(message))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}