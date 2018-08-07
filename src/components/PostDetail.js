import React from 'react'
import { Row, ListGroupItem, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { displayName, displayTimestamp } from '../utils/utils'

const PostDetail = props => (
  <ListGroupItem>
    <Row className="post-content">{props.post.content}</Row>
    <Row>
      <div className="post-info">
        {props.post.email == null || props.post.email === '' ? (
          displayName(props.post.name)
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`email-${props.post._id}`}>{`电子邮件：${
                props.post.email
              }`}</Tooltip>
            }
          >
            <a href={`mailto:${props.post.email}`}>
              {displayName(props.post.name)}
            </a>
          </OverlayTrigger>
        )}
        &nbsp;‧&nbsp;
        {displayTimestamp(props.post.timestamp)}
      </div>
    </Row>
  </ListGroupItem>
)

export default PostDetail
