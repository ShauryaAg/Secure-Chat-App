import React, { Component } from "react"
import { connect } from 'react-redux'

import { sendMessage } from '../store/actions'

class SendMessage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="message"
                    id="message"
                    onChange={this.handleChange}
                />
                <button type="submit">Send</button>
            </form>
        )
    }
}
export default connect(() => ({}), { sendMessage })(SendMessage)