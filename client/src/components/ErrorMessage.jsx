import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const ErrorMessage = ({ error }) => (
    <Fragment>
        {error ? error.message : null}
    </Fragment>
)

export default connect(store => ({ error: store.error }))(ErrorMessage)