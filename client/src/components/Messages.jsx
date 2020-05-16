import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { getMessages } from '../store/actions'
import Message from './Message'

import socketIOClient from "socket.io-client"
const ENDPOINT = "https://secure-chat-app.now.sh"


class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            message: ''
        }

        const { auth } = this.props

        const socket = socketIOClient(ENDPOINT);

        socket.on('connect', () => {
            socket.emit('storeClientInfo', { customId: auth.user.id })
        })
        socket.on("message", data => {
            this.props.messages.push(data)
            this.setState(data);
        });
    }

    componentDidMount() {
        const { getMessages } = this.props
        getMessages()
    }

    render() {
        const { auth } = this.props

        const messages = this.props.messages.map((message, index) => (
            <li key={index}>
                {message.user.username}: {message.message}
            </li>)
        )

        return (
            <Fragment>
                {auth.isAuthenticated ?
                    <Fragment>
                        <ul>{messages}</ul>
                        <Message />
                    </Fragment> :
                    null}
            </Fragment>
        )
    }
}

export default connect(store => ({
    auth: store.auth,
    messages: store.messages
}), { getMessages })(Messages)