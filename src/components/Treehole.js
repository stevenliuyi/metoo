import React, { Component } from 'react'
import {
  Grid,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import {
  MdHome,
  MdRefresh,
  MdAddToPhotos,
  MdErrorOutline
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import { fetchAllPosts } from '../utils/api'
import './Treehole.css'
import Header from './Header'
import PostDetail from './PostDetail'
import EditPost from './EditPost'

const alertOptions = {
  position: 'bottom',
  effect: 'stackslide',
  timeout: 2000
}

class Treehole extends Component {
  state = {
    posts: [],
    editPost: false,
    status: 'loading'
  }

  update = () => {
    this.setState({ status: 'loading' })
    fetchAllPosts().then(res => {
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

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <Grid>
        <Header title="树洞" />
        <div id="treehole-buttonbar">
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
            <span className="treehole-button" onClick={this.update}>
              <MdRefresh size={30} />
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="submit">发布新内容</Tooltip>}
          >
            <span
              id="submit-button"
              className="treehole-button"
              onClick={() => this.setState({ editPost: true })}
            >
              <MdAddToPhotos size={30} />
            </span>
          </OverlayTrigger>
        </div>
        {this.state.status === 'loaded' && (
          <ListGroup>
            {this.state.editPost && (
              <ListGroupItem>
                <EditPost
                  onClose={() => this.setState({ editPost: false })}
                  onSubmit={newPost => {
                    if (newPost == null) {
                      // error
                      Alert.warning('提交失败，请稍候再试')
                    } else {
                      Alert.success('发布成功')
                      this.setState({ posts: [newPost, ...this.state.posts] })
                    }
                  }}
                />
              </ListGroupItem>
            )}
            {this.state.posts.map((post, idx) => (
              <PostDetail
                key={`post-${post._id}`}
                post={post}
                commentsToggle={() => {
                  let posts = this.state.posts
                  posts[idx].showComments = !posts[idx].showComments
                  this.setState({ posts })
                }}
                commentCountInc={() => {
                  let posts = this.state.posts
                  posts[idx].commentCount += 1
                  this.setState({ posts })
                }}
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
        <Alert stack={{ limit: 3 }} {...alertOptions} />
      </Grid>
    )
  }
}

export default Treehole
