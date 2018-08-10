import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { FaTwitter, FaFacebook, FaWeibo } from 'react-icons/fa'
import { MdShare } from 'react-icons/md'

const ShareButton = props => (
  <OverlayTrigger
    trigger="click"
    rootClose
    placement="right"
    overlay={
      <Popover id={`share-${props.postId}`}>
        <span
          className="share-site"
          onClick={() =>
            window.open(`https://www.facebook.com/sharer.php?u=${props.url}`)
          }
        >
          <FaFacebook size={20} />
        </span>
        <span
          className="share-site"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${
                props.url
              }&text=${encodeURIComponent(props.content + ' #MeToo')}`
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
                props.url
              }&title=${encodeURIComponent(props.content + ' #MeToo')}`
            )
          }
        >
          <FaWeibo size={20} />
        </span>
      </Popover>
    }
    onClick={e => e.stopPropagation()}
  >
    <span className="share-button pull-left">
      <MdShare size={16} />
    </span>
  </OverlayTrigger>
)

export default ShareButton
