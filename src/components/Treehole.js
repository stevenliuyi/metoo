import React, { Component } from 'react'
import {
  Grid,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
  Col
} from 'react-bootstrap'
import {
  MdHome,
  MdRefresh,
  MdAddToPhotos,
  MdErrorOutline,
  MdClear
} from 'react-icons/md'
import { Link, withRouter } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import { fetchAllPosts, searchPosts } from '../utils/api'
import './Treehole.css'
import Header from './Header'
import PostDetail from './PostDetail'
import EditPost from './EditPost'
import PostSortButton from './PostSortButton'
import SearchPost from './SearchPost'

const alertOptions = {
  position: 'bottom',
  effect: 'stackslide',
  timeout: 2000
}

class Treehole extends Component {
  state = {
    posts: [],
    editPost: true,
    status: 'loading',
    // 1 - newest first; 2 - oldest first; 3 - most commented first
    sortMethod: 1,
    searchText: '',
    submittedSearchText: ''
  }

  update = text => {
    const searchText = text != null ? text : this.state.searchText
    this.setState({ status: 'loading' })

    let fetchedPosts
    if (searchText === '')
      fetchedPosts = fetchAllPosts(this.state.sortMethod, this.props.admin)
    else
      fetchedPosts = searchPosts(
        searchText,
        this.state.sortMethod,
        this.props.admin
      )

    fetchedPosts.then(res => {
      if (res == null) {
        this.setState({ status: 'error' })
      } else {
        this.setState({
          posts: res.map(v => {
            v.showComments = false
            return v
          }),
          status: 'loaded'
        })
      }
    })
  }

  sortToggle = val => {
    this.setState({ sortMethod: parseInt(val, 10) })
  }

  componentDidMount() {
    if (this.props.admin) this.setState({ editPost: false })
    this.update()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortMethod !== this.state.sortMethod)
      this.update(this.state.submittedSearchText)
    if (!prevState.editPost && this.state.editPost)
      document.querySelector('#post-content > textarea').focus()
  }

  render() {
    return (
      <Grid>
        <Helmet>
          <title>#MeToo 在中国 | 树洞</title>
          <meta name="description" content="告别沉默，勇敢发声" />
          <meta property="og:title" content="#MeToo 在中国 | 树洞" />
          <meta
            property="og:image"
            content={`${window.location.origin}/images/metoo-treehole.jpg`}
          />
          <meta property="og:image:alt" content="#MeToo × 树洞" />
          <meta
            property="og:url"
            content={`${window.location.origin}/treehole`}
          />
          <meta property="og:description" content="告别沉默，勇敢发声" />
        </Helmet>
        <Header
          title="树洞"
          onClickLeft={() => this.props.history.push('/')}
          onClickRight={() => this.props.history.push('/treehole')}
        />
        <Col sm={12} md={8} mdOffset={2}>
          <div id="treehole-buttonbar">
            <SearchPost
              searchText={this.state.searchText}
              onChange={e => this.setState({ searchText: e.target.value })}
              onSearch={() => {
                this.setState({
                  editPost: false,
                  submittedSearchText: this.state.searchText
                })
                this.update()
              }}
            />
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="home">返回首页</Tooltip>}
            >
              <Link to="/">
                <span className="treehole-button">
                  <MdHome size={30} />
                </span>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="home">刷新</Tooltip>}
            >
              <span
                className="treehole-button"
                onClick={() => this.update(this.submittedSearchText)}
              >
                <MdRefresh size={30} />
              </span>
            </OverlayTrigger>
            <PostSortButton
              sortToggle={this.sortToggle}
              sortMethod={this.state.sortMethod}
            />
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="submit">发布新内容</Tooltip>}
            >
              <span
                id="submit-button"
                className="treehole-button"
                onClick={() => {
                  if (this.state.editPost)
                    document.querySelector('#post-content > textarea').focus()
                  else this.setState({ editPost: true })
                }}
              >
                <MdAddToPhotos size={30} />
              </span>
            </OverlayTrigger>
          </div>
          {this.state.submittedSearchText !== '' && (
            <div id="search-result" className="muted-text">
              {`共 ${this.state.posts.length} 条包含“`}
              <strong>{this.state.submittedSearchText}</strong>
              {'”的树洞贴'}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="clear-result">清除搜索结果</Tooltip>}
              >
                <span
                  id="search-clear"
                  onClick={() => {
                    this.setState({ searchText: '', submittedSearchText: '' })
                    this.update('')
                  }}
                >
                  <MdClear size={16} />
                </span>
              </OverlayTrigger>
            </div>
          )}
          {this.state.status === 'loaded' && (
            <ListGroup>
              {this.state.editPost && (
                <ListGroupItem id="edit-post-item">
                  <EditPost
                    admin={this.props.admin}
                    onClose={() => this.setState({ editPost: false })}
                    onSubmit={newPost => {
                      if (newPost == null) {
                        // error
                        Alert.warning('提交失败，请稍候再试')
                      } else {
                        Alert.success('发布成功')
                        this.setState({
                          posts: [newPost, ...this.state.posts],
                          editPost: false
                        })
                      }
                    }}
                  />
                </ListGroupItem>
              )}
              {this.state.posts.map((post, idx) => (
                <PostDetail
                  key={`post-${post._id}`}
                  post={post}
                  admin={this.props.admin}
                  searchText={this.state.searchText}
                  commentsToggle={() => {
                    let posts = this.state.posts
                    if (
                      (this.props.admin
                        ? posts[idx].commentCountAll
                        : posts[idx].commentCount) > 0
                    ) {
                      posts[idx].showComments = !posts[idx].showComments
                      this.setState({ posts })
                    }
                  }}
                  commentCountInc={(inc = 1, normalCommentDeleted = false) => {
                    let posts = this.state.posts
                    if (!normalCommentDeleted) posts[idx].commentCountAll += inc
                    if (!this.props.admin || normalCommentDeleted)
                      posts[idx].commentCount += inc
                    this.setState({ posts })
                  }}
                  onUpdate={() => this.update(this.state.submittedSearchText)}
                />
              ))}
            </ListGroup>
          )}
          {this.state.status === 'loading' && (
            <div className="load-message">
              <BeatLoader
                color={'#bbb'}
                size={20}
                loading={true}
                loaderStyle={{ textAlign: 'center' }}
              />
              <div id="loading-text">数据读取中</div>
            </div>
          )}
          {this.state.status === 'error' && (
            <div className="load-message">
              <MdErrorOutline size={64} color={'#bbb'} />
              <div id="error-text" onClick={this.update}>
                数据读取失败，请刷新重试。
              </div>
            </div>
          )}
        </Col>
        <Alert stack={{ limit: 3 }} {...alertOptions} />
      </Grid>
    )
  }
}

export default withRouter(Treehole)
