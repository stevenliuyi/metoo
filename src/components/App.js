import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { isMobile } from 'react-device-detect'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import data from '../data/data.js'
import Main from './Main'
import Footer from './Footer'
import Treehole from './Treehole'
import PostPage from './PostPage'
import { setVhs } from '../utils/utils'
import { Switch, Route } from 'react-router'

class App extends Component {
  state = {
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
          <meta name="keywords" content="Metoo, 米兔, 中国, 性骚扰, 性侵" />
          <meta name="url" content={window.location.origin} />
          <meta property="og:title" content="#MeToo 在中国" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`${window.location.origin}/images/metoo-china.jpg`}
          />
          <meta property="og:image:alt" content="#MeToo × 中国" />
          <meta property="og:url" content={window.location.origin} />
          <meta
            property="og:description"
            content={`2017年起 #MeToo 运动席卷全球，在中国有以下${
              Object.keys(data).length
            }人被指控性骚扰或性侵犯。`}
          />
          <meta property="og:locale" content="zh_CN" />
          <meta property="fb:app_id" content="1749911795057434" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <div id="content">
          <Switch>
            <Route
              exact
              path="/treehole"
              render={() => <Treehole admin={false} />}
            />
            <Route
              exact
              path="/:name?"
              render={({ match }) => (
                <Main
                  data={data}
                  name={match.params.name}
                  sortToggle={this.sortToggle}
                  {...this.state}
                />
              )}
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
