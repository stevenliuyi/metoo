import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { ResizableBox } from 'react-resizable'
import Recaptcha from 'react-google-invisible-recaptcha'
import { submitComment } from '../utils/api'

class EditComment extends Component {
  onSubmit = () => {
    this.captcha.execute()
  }

  onResolved = () => {
    const newComment = {
      captcha: this.captcha.getResponse(),
      content: document.querySelector(
        `#resizable-${this.props.postId} > textarea`
      ).value,
      postId: this.props.postId
    }
    submitComment(newComment).then(newComment =>
      this.props.onSubmit(newComment)
    )
  }

  render() {
    return (
      <div id="edit-comment-box" className="comment-box">
        <div className="edit-comment">
          <ResizableBox
            id={`resizable-${this.props.postId}`}
            height={window.innerHeight * 0.15}
            width={Infinity}
            minConstraints={[0, 40]}
            maxConstraints={[Infinity, window.innerHeight * 0.6]}
            axis="y"
          >
            <FormControl
              componentClass="textarea"
              name="content"
              placeholder="在此输入评论内容"
              defaultValue=""
            />
          </ResizableBox>
          <ButtonToolbar style={{ paddingTop: '10px' }}>
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
          local="zh-cn"
        />
      </div>
    )
  }
}

export default EditComment
