import React, { Component } from 'react'
import { Grid, Row, ListGroupItem } from 'react-bootstrap'
import { displayTimestamp } from '../utils/utils'
import Alert from 'react-s-alert'
import Header from './Header'
import Comments from './Comments'
import EditComment from './EditComment'
import ShareButton from './ShareButton'
import { fetchAllPosts, fetchComments } from '../utils/api'

const alertOptions = {
  position: 'bottom',
  effect: 'stackslide',
  timeout: 2000
}

class PostPage extends Component {
  state = {
    comments: [],
    editComment: false,
    postId: null,
    post: null
  }

  update = () => {
    fetchAllPosts(this.state.postId).then(res =>
      this.setState({ post: res.find(e => e._id === this.state.postId) })
    )
    fetchComments(this.state.postId).then(res =>
      this.setState({ comments: res })
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.postId !== this.state.postId) this.update()
  }

  componentDidMount() {
    this.setState({ postId: this.props.match.params.postId })
  }

  render() {
    if (this.state.postId == null || this.state.post == null) return <div />

    return (
      <div>
        <Header
          title="树洞"
          onClick={() => window.open('/treehole', '_self')}
        />
        <Grid>
          <ListGroupItem>
            <div className="post-box">
              <Row className="post-content">{this.state.post.content}</Row>
              <Row>
                <div className="post-info">
                  <ShareButton
                    url={`${window.location.origin}/treehole/${
                      this.state.postId
                    }`}
                    content={this.state.post.content}
                  />
                  <span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={e => {
                        e.stopPropagation()
                        this.setState({ editComment: true })
                      }}
                    >
                      添加评论 &nbsp;‧&nbsp;
                    </span>
                  </span>
                  <span>评论 ({this.state.post.commentCount})</span>{' '}
                  &nbsp;‧&nbsp;
                  {displayTimestamp(this.state.post.timestamp)}
                </div>
              </Row>
              {this.state.editComment && (
                <EditComment
                  postId={this.state.postId}
                  onClose={() => this.setState({ editComment: false })}
                  onSubmit={newComment => {
                    if (newComment == null) {
                      // error
                      Alert.warning('评论提交失败，请稍候再试')
                    } else {
                      // success
                      Alert.success('评论发布成功')
                      this.setState({
                        comments: [newComment, ...this.state.comments],
                        editComment: false
                      })
                      this.setState({
                        post: {
                          ...this.state.post,
                          commentCount: this.state.post.commentCount + 1
                        }
                      })
                    }
                  }}
                />
              )}
              <Comments comments={this.state.comments} />
            </div>
          </ListGroupItem>
        </Grid>
        <Alert stack={{ limit: 3 }} {...alertOptions} />
      </div>
    )
  }
}

export default PostPage
