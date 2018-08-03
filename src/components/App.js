import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {
  Grid,
  DropdownButton,
  MenuItem,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { MdSort, MdDone } from 'react-icons/md'
import { isMobile } from 'react-device-detect'
import data from '../data/data.js'
import PersonDetail from './PersonDetail'

class App extends Component {
  state = {
    currentPerson: null,
    sortMethod: 1
  }

  componentDidMount() {
    // set vh-related styles on mobile devices
    if (isMobile) {
      this.setVhs()
      window.addEventListener('deviceorientation', this.setVhs)
    }
  }

  // fix the vh issue on mobile devices
  // https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
  setVhs = () => {
    const vh = window.innerHeight
    document.getElementById('content').style.minHeight = `${vh - 60}px`
    document.getElementById('info-wrapper').style.height = `${0.35 * vh}px`
    document.getElementById('people-grid').style.maxHeight = `${0.36 * vh}px`
    document.getElementById('info').style.fontSize = `${0.03 * vh}px`
    if (document.getElementById('number') != null)
      document.getElementById('number').style.fontSize = `${0.1 * vh}px`
    if (document.getElementById('photo') != null)
      document.getElementById('photo').style.height = `${0.2 * vh}px`
  }

  sortToggle = val => {
    this.setState({ sortMethod: parseInt(val, 10) })
    // scroll back to top
    document.getElementById('people-grid').scrollTop = 0
  }

  sort = array =>
    this.state.sortMethod === 1
      ? // sort by pinyin
        array.sort((a, b) => a.localeCompare(b, 'zh-CN'))
      : // sort by accusation date
        array.sort(
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
            <div
              id="title"
              className="h1"
              onClick={() => this.setState({ currentPerson: null })}
            >
              <strong>
                #MeToo{' '}
                <span id="times">
                  <FaTimes size={30} />
                </span>{' '}
                中国
              </strong>
            </div>
            <div id="subtitle" className="text-muted">
              人类历史上最大规模的屠杀，是房思琪式的强暴。
            </div>
            <div id="info-wrapper">
              <div id="info">
                {this.state.currentPerson == null ? (
                  <div id="messages">
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
              {this.state.currentPerson != null && (
                <img
                  id="photo"
                  src="/alexander-krivitskiy-575481-unsplash.jpg"
                  alt="woman"
                />
              )}
            </div>
            <div id="people-grid-wrapper">
              <div id="sort-button">
                <DropdownButton
                  noCaret
                  id="sort-dropdown"
                  title={
                    <span id="sort-icon">
                      <MdSort id="sort-main" size={30} />
                      <MdSort id="sort-outline" size={30} />
                    </span>
                  }
                  onSelect={this.sortToggle}
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
          <span className="footer-item">米兔在中国</span>
          &nbsp;‧&nbsp;
          <span className="footer-item">2018</span>
          &nbsp;‧&nbsp;
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="email">电子邮件：contact@metoochina.me</Tooltip>
            }
          >
            <a href="mailto:contact@metoochina.me">联系我们</a>
          </OverlayTrigger>
        </div>
      </div>
    )
  }
}

export default App
