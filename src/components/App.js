import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import data from '../data/data.js'
import PersonDetail from './PersonDetail'

class App extends Component {
  state = {
    currentPerson: null
  }

  render() {
    return (
      <div className='App'>
        <Grid>
          <div className="h1"><strong>#MeToo 中国</strong></div>
          <div id='info'>
           { this.state.currentPerson == null ?
             <div>
               <div>
                 2017年10月Me Too运动爆发后，以下
               </div>
               <div id='number'>
                 {Object.keys(data).length}
               </div>
               <div>
               位中国公众人物遭到了性骚扰或性侵犯的指控。
               </div>
             </div>
             : <PersonDetail name={this.state.currentPerson} data={data[this.state.currentPerson]} />
           }
          </div>
          <div id='people-grid'>
          {
            Object.keys(data).map(name => (
              <div className='person' key={`person-${name}`} onClick={() => this.setState({ currentPerson: name })}>
                <img className='thumb' src={`/images/${data[name].photo}`} width={100} height={100} alt={name} />
                <div>{ name }</div>
              </div>
            ))
          }
          </div>
        </Grid>
      </div>
    );
  }
}

export default App;
