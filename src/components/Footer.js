import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = props => (
  <div id="footer" className="unselectable">
    <img
      id="rabbit-icon"
      src="/favicon-32x32.png"
      width={24}
      height={24}
      alt="MeToo logo"
    />{' '}
    <Link to="/">
      <span className="footer-item">米兔在中国</span>
    </Link>
    &nbsp;‧&nbsp;
    <Link to="/treehole">
      <span className="footer-item">树洞</span>
    </Link>
    &nbsp;‧&nbsp;
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="email">电子邮件：contact@metoochina.me</Tooltip>}
    >
      <a href="mailto:contact@metoochina.me">联系我们</a>
    </OverlayTrigger>
    &nbsp;‧&nbsp;
    <span className="footer-item">2018－2019</span>
    <div style={{ padding: '10px 20px 0px 20px' }}>
      本站内容皆从网络公开渠道收集，仅供参考，本站不对所涉及指控的真实性背书。
    </div>
  </div>
)

export default Footer
