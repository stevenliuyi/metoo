import React, { Component } from 'react'
import { Row, ListGroupItem } from 'react-bootstrap'
import { displayTimestamp } from '../utils/utils'
import Alert from 'react-s-alert'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
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
          className="post-box"
          onClick={() => {
            if (!this.state.editComment) this.props.commentsToggle()
          }}
        >
          <Row className="post-content">{this.props.post.content}</Row>
          <Row>
            <div className="post-info">
              <span
                style={{
                  cursor: 'pointer',
                  verticalAlign: '-webkit-baseline-middle',
                  paddingRight: '5px'
                }}
              >
                {this.props.post.showComments ? (
                  <FaAngleUp size={20} />
                ) : (
                  <FaAngleDown size={20} />
                )}
              </span>
              <span
                style={{ cursor: 'pointer' }}
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
                if (newComment == null) {
                  // error
                  Alert.warning('回复提交失败，请稍候再试')
                } else {
                  // success
                  Alert.success('回复发布成功')
                  this.setState({
                    comments: [newComment, ...this.state.comments]
                  })
                  this.props.commentCountInc()
                }
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
