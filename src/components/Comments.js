import React, { Component } from 'react'
import { Label } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import Alert from 'react-s-alert'
import AdminModal from './AdminModal'
import { displayTimestamp } from '../utils/utils'
import { deleteComment } from '../utils/api'

class Comments extends Component {
  state = {
    currentCommentId: null,
    adminKeyDialog: false,
    adminKey: ''
  }

  render() {
    return (
      this.props.comments.length > 0 && (
        <div onClick={e => e.stopPropagation()}>
          {this.props.comments.map(comment => (
            <div className="comment-box" key={`comment-${comment._id}`}>
              <div className="comment-content">{comment.content}</div>
              <div className="post-info">
                {this.props.admin &&
                  comment.forTest && (
                    <Label
                      className="pull-left"
                      style={{ marginLeft: '20px', marginTop: '5px' }}
                    >
                      测试评论
                    </Label>
                  )}
                {this.props.admin &&
                  comment.isDeleted && (
                    <Label
                      className="pull-left"
                      style={{ marginLeft: '20px', marginTop: '5px' }}
                    >
                      已删除
                    </Label>
                  )}
                {this.props.admin && (
                  <span
                    style={{
                      verticalAlign: 'text-top',
                      marginRight: '5px',
                      cursor: 'pointer'
                    }}
                    onClick={() =>
                      this.setState({
                        adminKeyDialog: true,
                        currentCommentId: comment._id
                      })
                    }
                  >
                    <MdDelete size={18} />
                  </span>
                )}
                {displayTimestamp(comment.timestamp)}
              </div>
            </div>
          ))}
          <AdminModal
            adminKey={this.state.adminKey}
            show={this.state.adminKeyDialog}
            onHide={() =>
              this.setState({ adminKeyDialog: false, adminKey: '' })
            }
            onChangeKey={e => this.setState({ adminKey: e.target.value })}
            onSubmit={() =>
              deleteComment(
                this.props.postId,
                this.state.currentCommentId,
                this.state.adminKey
              ).then(res => {
                if (res == null || !res.success) {
                  if (res != null && res.error === 'wrong key')
                    Alert.warning('密码输入错误')
                  else Alert.warning('评论删除失败')
                } else {
                  Alert.success('评论删除成功')
                  this.setState({ adminKeyDialog: false, adminKey: '' })
                  this.props.onDelete()
                }
              })
            }
          />
        </div>
      )
    )
  }
}

export default Comments
