import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../store/actions'

const NavBar = ({ auth, logout }) => (
    <div>
        <ul>
            {auth.isAuthenticated ?
                <Fragment>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                    <p>Logged in as {auth.user.username}</p>
                </Fragment>
                :
                <Fragment>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </Fragment>
            }
        </ul>
    </div>
)

export default connect(store => ({ auth: store.auth }), { logout })(NavBar)