import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import data from '../data/data.js'
import Header from './Header'
import Messages from './Messages'
import PersonDetail from './PersonDetail'
import AvatarGrid from './AvatarGrid'

class Main extends Component {
  state = {
    currentPerson: null
  }

  componentDidUpdate({ name }) {
    if (name !== this.props.name) {
      // hyphens are preferred in the URLs
      // see https://support.google.com/webmasters/answer/76329?hl=en
      const newPerson = this.props.name.includes('-')
        ? this.props.name.replace('-', '_')
        : this.props.name
      this.setState({ currentPerson: newPerson })
    }
  }

  render() {
    return (
      <Grid>
        {this.state.currentPerson != null && (
          <Helmet>
            <title>{`#MeToo 在中国 | ${
              data[this.state.currentPerson].name
            }`}</title>
            <meta
              name="description"
              content={`${data[this.state.currentPerson].name} - ${
                data[this.state.currentPerson].details
              }`}
            />
            <meta
              property="og:title"
              content={`#MeToo 在中国 | ${data[this.state.currentPerson].name}`}
            />
            <meta
              property="og:url"
              content={`${
                window.location.origin
              }/${this.state.currentPerson.replace('_', '-')}`}
            />
          </Helmet>
        )}
        <Header title="中国" onClick={() => this.props.history.push('/')} />
        <div id="info-wrapper">
          <div id="info">
            {!Object.keys(data).includes(this.state.currentPerson) ? (
              <Messages number={Object.keys(data).length} />
            ) : (
              <PersonDetail
                name={this.state.currentPerson}
                data={data[this.state.currentPerson]}
              />
            )}
          </div>
          {Object.keys(data).includes(this.state.currentPerson) && (
            <img
              id="photo"
              className="unselectable"
              src="/images/alexander-krivitskiy-575481-unsplash.jpg"
              alt="woman"
            />
          )}
        </div>
        <AvatarGrid {...this.state} {...this.props} />
      </Grid>
    )
  }
}

export default withRouter(Main)
