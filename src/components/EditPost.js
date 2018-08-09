import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import Recaptcha from 'react-google-invisible-recaptcha'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { submitPost } from '../utils/api'

class EditPost extends Component {
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
    this.captcha.execute()
  }

  render() {
    return (
      <ResizableBox
        height={window.innerHeight * 0.25}
        width={Infinity}
        minConstraints={[0, 200]}
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
          />
          <ButtonToolbar id="edit-post-buttonbar">
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
