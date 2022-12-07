import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './navbar'
import MessagesList from './MessagesList'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <main>
          <Switch>
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    )
  }
}
