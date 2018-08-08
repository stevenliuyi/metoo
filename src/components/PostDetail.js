import React, { Component } from 'react'
import { Row, ListGroupItem } from 'react-bootstrap'
import { displayTimestamp } from '../utils/utils'
import Comments from './Comments'
import EditComment from './EditComment'
import { fetchComments } from '../utils/api'

class PostDetail extends Component {
  state = {
    comments: [],
    editComment: false
  }

  update = () => {
    fetchComments(this.props.post._id).then(res =>
      this.setState({ comments: res })
    )
  }

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <ListGroupItem>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!this.state.editComment) this.props.commentsToggle()
          }}
        >
          <Row className="post-content">{this.props.post.content}</Row>
          <Row>
            <div className="post-info">
              <span
                onClick={e => {
                  e.stopPropagation()
                  this.setState({ editComment: true })
                }}
              >
                添加回复 &nbsp;‧&nbsp;
              </span>
              回复 ({this.props.post.commentCount}) &nbsp;‧&nbsp;
              {displayTimestamp(this.props.post.timestamp)}
            </div>
          </Row>
          {this.state.editComment && (
            <EditComment
              postId={this.props.post._id}
              onClose={() => this.setState({ editComment: false })}
              onSubmit={newComment => {
                this.setState({
                  comments: [newComment, ...this.state.comments]
                })
                this.props.commentCountInc()
              }}
            />
          )}
          {this.props.post.showComments && (
            <Comments comments={this.state.comments} />
          )}
        </div>
      </ListGroupItem>
    )
  }
}

export default PostDetail
