import React, { Component } from 'react'
import { Route, withRouter} from 'react-router-dom'
import Auth from './auth/Auth'
import Vote from './vote/Vote'

class AppViews extends Component {

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Auth {...props} />
                }} />
                <Route exact path="/vote" render={(props) => {
                    return <Vote {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(AppViews)