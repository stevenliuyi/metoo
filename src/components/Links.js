import React, { Component } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { IoIosLink } from 'react-icons/io'
import { FaWikipediaW } from 'react-icons/fa'

class Links extends Component {
  render() {
    const prefix =
      this.props.type === 'wikipedia'
        ? '维基百科：'
        : this.props.type === 'zhihu'
          ? '知乎：'
          : ''
    return (
      <span>
        {this.props.links &&
          this.props.links.map((link, idx) => (
            <OverlayTrigger
              key={`link-${idx}`}
              placement="top"
              overlay={
                <Tooltip id={link.title}>{`${prefix}${link.title}`}</Tooltip>
              }
            >
              <a href={link.url}>
                <span className="circle">
                  {this.props.type === 'wikipedia' ? (
                    <FaWikipediaW size={14} className="icon" />
                  ) : this.props.type === 'zhihu' ? (
                    '知'
                  ) : (
                    <IoIosLink size={14} className="icon" />
                  )}
                </span>
              </a>
            </OverlayTrigger>
          ))}
      </span>
    )
  }
}

export default Links
