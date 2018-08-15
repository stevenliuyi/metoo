import React, { Component } from 'react'
import { Grid, Row, ListGroupItem, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Helmet } from 'react-helmet'
import { displayFullTimestamp } from '../utils/utils'
import Header from './Header'
import Comments from './Comments'
import EditComment from './EditComment'
import ShareButton from './ShareButton'
import { fetchPost, fetchComments } from '../utils/api'

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
    fetchPost(this.state.postId).then(res => this.setState({ post: res }))
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
        <Helmet>
          <title>#MeToo 在中国 | 树洞</title>
          <meta property="og:title" content={'#MeToo 在中国 | 树洞'} />
          <meta
            property="og:url"
            content={`${window.location.origin}/treehole/${this.state.postId}`}
          />
        </Helmet>
        <Header
          title="树洞"
          onClickLeft={() => this.props.history.push('/')}
          onClickRight={() => this.props.history.push('/treehole')}
        />
        <Grid>
          <Col sm={12} md={8} mdOffset={2}>
            <ListGroupItem>
              <div className="post-box">
                <Row className="post-content">{this.state.post.content}</Row>
                <Row>
                  <div className="post-info unselectable">
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
                    {displayFullTimestamp(this.state.post.timestamp)}
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
          </Col>
        </Grid>
        <Alert stack={{ limit: 3 }} {...alertOptions} />
      </div>
    )
  }
}

export default withRouter(PostPage)
