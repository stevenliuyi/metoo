import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import Recaptcha from 'react-google-invisible-recaptcha'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import Alert from 'react-s-alert'
import { submitPost } from '../utils/api'

class EditPost extends Component {
  state = {
    wordCount: 0
  }

  onResolved = () => {
    const newPost = {
      captcha: this.captcha.getResponse(),
      content: document.querySelector('#post-content > textarea').value
    }
    submitPost(newPost).then(newPost => {
      this.props.onSubmit(newPost)
    })
  }

  onSubmit = () => {
    if (this.state.wordCount < 10) {
      Alert.warning('发布内容至少10字')
    } else {
      this.captcha.execute()
    }
  }

  render() {
    return (
      <ResizableBox
        height={window.innerHeight * 0.25}
        width={Infinity}
        minConstraints={[0, 80]}
        maxConstraints={[Infinity, window.innerHeight * 0.8]}
        axis="y"
        onResizeStart={e => {
          e.preventDefault()
          document.querySelector('#post-content > textarea').focus()
        }}
      >
        <div id="post-content">
          <FormControl
            componentClass="textarea"
            name="content"
            placeholder="分享你的故事……"
            defaultValue=""
            onChange={e =>
              this.setState({
                wordCount: e.target.value.replace(/\n|\r|\t|\s/g, '').length
              })
            }
            data-gramm_editor={false}
          />
          <ButtonToolbar id="edit-post-buttonbar">
            <span className="editor-info">{`共 ${
              this.state.wordCount
            } 字`}</span>
            <Button className="pull-right" onClick={() => this.props.onClose()}>
              取消
            </Button>
            <Button
              className="pull-right"
              bsStyle="primary"
              onClick={this.onSubmit}
            >
              提交
            </Button>
          </ButtonToolbar>
        </div>
        <Recaptcha
          ref={el => (this.captcha = el)}
          sitekey="6LeaEGkUAAAAAOLDd81ewgo_R7gbHzoaMUV7NkWH"
          onResolved={this.onResolved}
          locale="zh-CN"
        />
      </ResizableBox>
    )
  }
}

export default EditPost
