import React, { Component } from 'react'
import { Label, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdDelete, MdUndo } from 'react-icons/md'
import Alert from 'react-s-alert'
import AdminModal from './AdminModal'
import { displayTimestamp } from '../utils/utils'
import { deleteComment, recoverComment } from '../utils/api'

class Comments extends Component {
  state = {
    currentCommentId: null,
    currentCommentIsDeleted: false,
    currentCommentForTest: false,
    adminKeyDialog: false,
    adminKey: ''
  }

  render() {
    return (
      this.props.comments.length > 0 && (
        <div onClick={e => e.stopPropagation()}>
          {this.props.comments.map(comment => (
            <div
              className="comment-box"
              key={`comment-${comment._id}`}
              style={
                comment.isDeleted || comment.forTest
                  ? { backgroundColor: '#fafafa' }
                  : {}
              }
            >
              <div className="comment-content">{comment.content}</div>
              <div className="post-info unseletable">
                {this.props.admin &&
                  comment.forTest && (
                    <Label
                      className="pull-left unselectable"
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
                        currentCommentId: comment._id,
                        currentCommentIsDeleted: comment.isDeleted,
                        currentCommentForTest: comment.forTest
                      })
                    }
                  >
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip id={`delete-recover-comment-${comment._id}`}>
                          {!comment.isDeleted ? '删除' : '恢复'}
                        </Tooltip>
                      }
                    >
                      {!comment.isDeleted ? (
                        <MdDelete size={18} />
                      ) : (
                        <MdUndo size={18} />
                      )}
                    </OverlayTrigger>
                  </span>
                )}
                {displayTimestamp(comment.timestamp)}
              </div>
            </div>
          ))}
          <AdminModal
            adminKey={this.state.adminKey}
            isDeleted={this.state.currentCommentIsDeleted}
            show={this.state.adminKeyDialog}
            onHide={() =>
              this.setState({ adminKeyDialog: false, adminKey: '' })
            }
            onChangeKey={e => this.setState({ adminKey: e.target.value })}
            onSubmit={() =>
              (!this.state.currentCommentIsDeleted
                ? deleteComment
                : recoverComment)(
                this.props.postId,
                this.state.currentCommentId,
                this.state.adminKey
              ).then(res => {
                if (res == null || !res.success) {
                  if (res != null && res.error === 'wrong key')
                    Alert.warning('密码输入错误')
                  else
                    Alert.warning(
                      !this.state.currentCommentIsDeleted
                        ? '评论删除失败'
                        : '评论恢复失败'
                    )
                } else {
                  Alert.success(
                    !this.state.currentCommentIsDeleted
                      ? '评论删除成功'
                      : '评论恢复成功'
                  )
                  this.setState({ adminKeyDialog: false, adminKey: '' })
                  if (!this.state.currentCommentIsDeleted) {
                    this.props.commentCountInc(
                      -1,
                      !this.state.currentCommentForTest
                    )
                  }
                  this.props.onUpdate()
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
