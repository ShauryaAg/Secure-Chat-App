import { SET_CURRENT_MESSAGE, SET_MESSAGES } from '../actionTypes'

export const messages = (state = [], action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.messages
        default:
            return state
    }
}

export const currentMessage = (state = [], action) => {
    switch (action.type) {
        case SET_CURRENT_MESSAGE:
            return action.message
        default:
            return state
    }
}

