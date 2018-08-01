import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
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
          <a href='/'>
            <div id='title' className="h1"><strong>#MeToo <span id='times'><FaTimes size={30} /></span> 中国</strong></div>
          </a>
          <div id='subtitle' className='text-muted'>
            人类历史上最大规模的屠杀，是房思琪式的强暴。
          </div>
          <div id='info'>
           { this.state.currentPerson == null ?
             <div>
               <div>
                 2017年 #MeToo 运动席卷全球后也在中国掀起风浪，以下
               </div>
               <div id='number'>
                 {Object.keys(data).length}
               </div>
               <div>
                 位中国公众人物被指控性骚扰或性侵犯。
               </div>
             </div>
             : <PersonDetail name={this.state.currentPerson} data={data[this.state.currentPerson]} />
           }
          </div>
          <div id='people-grid'>
          {
            Object.keys(data).sort().map(name => (
              <div className={`person ${ this.state.currentPerson === name ? 'person-highlight' : ''}`}
                key={`person-${name}`} onClick={() => this.setState({ currentPerson: name })}>
                <img className='thumb' src={`/images/${data[name].photo}`} width={72} height={72} alt={name} />
                <div className='person-name'>{ name }</div>
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
