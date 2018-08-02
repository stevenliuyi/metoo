import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid, DropdownButton, MenuItem } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { MdSort, MdDone } from 'react-icons/md'
import data from '../data/data.js'
import PersonDetail from './PersonDetail'

class App extends Component {
  state = {
    currentPerson: null,
    sortMethod: 1
  }

  sort = array =>
    this.state.sortMethod === 1
      ? array.sort((a, b) => a.localeCompare(b, 'zh-CN'))
      : array.sort(
          (a, b) =>
            data[a].date[0] + data[a].date[1] / 12.0 + data[a].date[2] / 365.0 >
            data[b].date[0] + data[b].date[1] / 12.0 + data[b].date[2] / 365.0
              ? 1
              : -1
        )

  render() {
    return (
      <div className="App">
        <div id="content">
          <Grid>
            <a href="/">
              <div id="title" className="h1">
                <strong>
                  #MeToo{' '}
                  <span id="times">
                    <FaTimes size={30} />
                  </span>{' '}
                  中国
                </strong>
              </div>
            </a>
            <div id="subtitle" className="text-muted">
              人类历史上最大规模的屠杀，是房思琪式的强暴。
            </div>
            <div id="info">
              {this.state.currentPerson == null ? (
                <div>
                  <div>2017年起 #MeToo 运动席卷全球，在中国有以下</div>
                  <div id="number">{Object.keys(data).length}</div>
                  <div>人被指控性骚扰或性侵犯。</div>
                </div>
              ) : (
                <PersonDetail
                  name={this.state.currentPerson}
                  data={data[this.state.currentPerson]}
                />
              )}
            </div>
            <div id="people-grid-wrapper">
              <div id="sort-icon">
                <DropdownButton
                  noCaret
                  id="sort-dropdown"
                  title={<MdSort size={30} />}
                  onSelect={val =>
                    this.setState({ sortMethod: parseInt(val, 10) })
                  }
                >
                  {['按拼音排序', '按指控日期排序'].map((method, idx) => (
                    <MenuItem key={`menutiem-${idx}`} eventKey={idx + 1}>
                      {method}{' '}
                      <span
                        className={`check-icon ${
                          this.state.sortMethod === idx + 1 ? '' : 'unchecked'
                        }`}
                      >
                        <MdDone size={12} />
                      </span>
                    </MenuItem>
                  ))}
                </DropdownButton>
              </div>
              <div id="people-grid">
                {this.sort(Object.keys(data)).map(name => (
                  <div
                    className={`person ${
                      this.state.currentPerson === name
                        ? 'person-highlight'
                        : ''
                    }`}
                    key={`person-${name}`}
                    onClick={() => this.setState({ currentPerson: name })}
                  >
                    <img
                      className="thumb"
                      src={
                        data[name].photo != null
                          ? `/images/${data[name].photo}`
                          : '/images/avatar.jpg'
                      }
                      width={72}
                      height={72}
                      alt={name}
                    />
                    <div className="person-name">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </div>
        <div id="footer">
          <img
            id="rabbit-icon"
            src="/favicon-32x32.png"
            width={24}
            height={24}
            alt="MeToo logo"
          />{' '}
          米兔在中国‧2018
        </div>
      </div>
    )
  }
}

export default App
