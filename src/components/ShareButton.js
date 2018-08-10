import React, { Component } from 'react'
import { OverlayTrigger, Popover, Modal } from 'react-bootstrap'
import { FaTwitter, FaFacebook, FaWeibo, FaWeixin, FaQq } from 'react-icons/fa'
import { MdShare } from 'react-icons/md'
import QRCode from 'qrcode.react'

class ShareButton extends Component {
  state = {
    showWechat: false
  }

  render() {
    return (
      <span>
        <OverlayTrigger
          ref={el => (this.overlay = el)}
          trigger="click"
          rootClose
          placement="right"
          overlay={
            <Popover id={`share-${this.props.postId}`}>
              <span
                className="share-site"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer.php?u=${this.props.url}`
                  )
                }
              >
                <FaFacebook size={20} />
              </span>
              <span
                className="share-site"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${
                      this.props.url
                    }&text=${encodeURIComponent(
                      this.props.content + ' #MeToo'
                    )}`
                  )
                }
              >
                <FaTwitter size={20} />
              </span>
              <span
                className="share-site"
                onClick={() =>
                  window.open(
                    `https://service.weibo.com/share/share.php?url=${
                      this.props.url
                    }&title=${encodeURIComponent(
                      this.props.content + ' #MeToo'
                    )}`
                  )
                }
              >
                <FaWeibo size={20} />
              </span>
              <span
                className="share-site"
                onClick={() => {
                  this.setState({ showWechat: true })
                  this.overlay.hide()
                }}
              >
                <FaWeixin size={20} />
              </span>
              <span
                className="share-site"
                onClick={() =>
                  window.open(
                    `http://connect.qq.com/widget/shareqq/index.html?url=${
                      this.props.url
                    }&title=${encodeURIComponent('#MeToo 树洞')}`
                  )
                }
              >
                <FaQq size={20} />
              </span>
            </Popover>
          }
          onClick={e => e.stopPropagation()}
        >
          <span className="share-button pull-left">
            <MdShare size={16} />
          </span>
        </OverlayTrigger>
        <Modal
          show={this.state.showWechat}
          onHide={() => this.setState({ showWechat: false })}
        >
          <Modal.Body
            style={{ textAlign: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <QRCode value={this.props.url} size={100} />
            <div style={{ paddingTop: '5px' }}>
              请使用微信“扫一扫”分享该链接
            </div>
          </Modal.Body>
        </Modal>
      </span>
    )
  }
}

export default ShareButton
