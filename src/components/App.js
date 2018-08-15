import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import data from '../data/data.js'
import Header from './Header'
import Messages from './Messages'
import PersonDetail from './PersonDetail'
import AvatarGrid from './AvatarGrid'
import Footer from './Footer'
import Treehole from './Treehole'
import PostPage from './PostPage'
import { setVhs } from '../utils/utils'
import { Switch, Route } from 'react-router'

class App extends Component {
  state = {
    currentPerson: null,
    sortMethod: 1
  }

  componentDidMount() {
    const gtag = window.gtag
    if (typeof gtag === 'function') {
      gtag('config', 'UA-123965687-1', {
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }

    // set vh-related styles on mobile devices
    if (isMobile) {
      setVhs()
      window.addEventListener('deviceorientation', setVhs)
    }
  }

  componentDidUpdate({ location, history }) {
    const gtag = window.gtag
    if (location.pathname === this.props.location.pathname) return
    if (history.action === 'PUSH' && typeof gtag === 'function') {
      gtag('config', 'UA-123965687-1', {
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }
  }

  sortToggle = val => {
    this.setState({ sortMethod: parseInt(val, 10) })
    // scroll back to top
    document.getElementById('people-grid').scrollTop = 0
  }

  updatePerson = name => this.setState({ currentPerson: name })

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>#MeToo 在中国</title>
          <meta
            name="description"
            content={`2017年起 #MeToo 运动席卷全球，在中国有以下${
              Object.keys(data).length
            }人被指控性骚扰或性侵犯。`}
          />
          <meta property="og:title" content={'#MeToo 在中国'} />
          <meta property="og:url" content={window.location.origin} />
        </Helmet>
        <div id="content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Grid>
                  <Header
                    title="中国"
                    onClick={() => this.updatePerson(null)}
                  />
                  <div id="info-wrapper">
                    <div id="info">
                      {this.state.currentPerson == null ? (
                        <Messages number={Object.keys(data).length} />
                      ) : (
                        <PersonDetail
                          name={this.state.currentPerson}
                          data={data[this.state.currentPerson]}
                        />
                      )}
                    </div>
                    {this.state.currentPerson != null && (
                      <img
                        id="photo"
                        className="unselectable"
                        src="/images/alexander-krivitskiy-575481-unsplash.jpg"
                        alt="woman"
                      />
                    )}
                  </div>
                  <AvatarGrid
                    data={data}
                    sortToggle={this.sortToggle}
                    updatePerson={this.updatePerson}
                    {...this.state}
                  />
                </Grid>
              )}
            />
            <Route
              exact
              path="/treehole"
              render={() => <Treehole admin={false} />}
            />
            <Route
              exact
              path="/treehole/admin"
              render={() => <Treehole admin={true} />}
            />
            <Route path="/treehole/:postId" component={PostPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
