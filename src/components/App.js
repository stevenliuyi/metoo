import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import data from '../data/data.js'
import Header from './Header'
import Messages from './Messages'
import PersonDetail from './PersonDetail'
import AvatarGrid from './AvatarGrid'
import Footer from './Footer'
import Treehole from './Treehole'
import { setVhs } from '../utils/utils'
import { Switch, Route } from 'react-router'

class App extends Component {
  state = {
    currentPerson: null,
    sortMethod: 1
  }

  componentDidMount() {
    // set vh-related styles on mobile devices
    if (isMobile) {
      setVhs()
      window.addEventListener('deviceorientation', setVhs)
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
            <Route exact path="/treehole" component={Treehole} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
