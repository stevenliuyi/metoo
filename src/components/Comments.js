import React, { Component } from 'react'
import { displayTimestamp } from '../utils/utils'

class Comments extends Component {
  render() {
    return (
      this.props.comments.length > 0 && (
        <div onClick={e => e.stopPropagation()}>
          {this.props.comments.map(comment => (
            <div className="comment-box" key={`comment-${comment._id}`}>
              <div className="comment-content">{comment.content}</div>
              <div className="post-info">
                {displayTimestamp(comment.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )
    )
  }
}

export default Comments
