import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import AuthPage from '../pages/AuthPage'
import Messages from '../components/Messages'

// import { getCurrentPoll } from '../store/actions'

const RouteViews = ({ auth }) => (<main>
    <Switch>
        <Route exact
            path="/login"
            render={() => (
                <AuthPage
                    authType='login'
                    isAuthenticated={auth.isAuthenticated}
                />
            )} />
        <Route exact
            path="/register"
            render={() => (
                <AuthPage
                    authType='register'
                    isAuthenticated={auth.isAuthenticated}
                />
            )} />
        <Route exact
            path="/"
            render={props =>
                <Messages {...props} />
            }
        />
        {/* <Route exact
            path='/poll/:id'
            render={props => (
                <PollPage getPoll={id => getCurrentPoll(id)} {...props} />
            )}
        /> */}
        />
    </Switch>
</main>)

export default withRouter(connect(store => ({ auth: store.auth }))(RouteViews))