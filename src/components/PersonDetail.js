import React, { Component } from 'react'
import { Label } from 'react-bootstrap'
import Links from './Links'

class PersonDetail extends Component {
  render() {
    const {
      name,
      intro,
      date,
      details,
      accusations,
      links,
      wikipedia,
      zhihu,
      quote,
      quoteby,
      progress
    } = this.props.data
    const progressText = progress ? progress.text : '无'
    const progressLink = progress ? progress.link : null
    return (
      <div id="detail-box">
        <div id="person-information">
          <div>{name}</div>
          <div className="intro">{intro}</div>
          <div className="intro">
            {`${date[0]}年${date[1]}月${date[2]}日被指控`}
          </div>
          <div id="detail">{details}</div>
          <div id="detail-links">
            {accusations && (
              <span className="link unselectable">
                <Label className="link-label">指控</Label>
                <Links links={accusations} />
              </span>
            )}
            {(links || wikipedia || zhihu) && (
              <span className="link unselectable">
                <Label className="link-label">链接</Label>
                <Links links={links} />
                <Links links={wikipedia} type="wikipedia" />
                <Links links={zhihu} type="zhihu" />
              </span>
            )}
            <span className="link unselectable">
              <Label className="link-label">进展</Label>
              {progressLink ? (
                <a
                  href={progressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link-progress">{progressText}</span>
                </a>
              ) : (
                <span className="link-progress">{progressText}</span>
              )}
            </span>
          </div>
        </div>
        <div id="quote">
          {quote && (
            <div>
              {`“${quote}”`}
              <div id="quote-by">{`── ${quoteby}`}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PersonDetail
