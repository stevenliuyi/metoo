import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Footer = props => (
  <div id="footer" className="unselectable">
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
      overlay={<Tooltip id="email">电子邮件：contact@metoochina.me</Tooltip>}
    >
      <a href="mailto:contact@metoochina.me">联系我们</a>
    </OverlayTrigger>
  </div>
)

export default Footer
