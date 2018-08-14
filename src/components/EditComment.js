import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { ResizableBox } from 'react-resizable'
import Recaptcha from 'react-google-invisible-recaptcha'
import Alert from 'react-s-alert'
import { submitComment } from '../utils/api'

class EditComment extends Component {
  state = {
    wordCount: 0
  }

  onSubmit = () => {
    if (this.state.wordCount === 0) {
      Alert.warning('尚未输入任何评论')
    } else {
      this.captcha.execute()
    }
  }

  onResolved = () => {
    const newComment = {
      captcha: this.captcha.getResponse(),
      content: document.querySelector(
        `#resizable-${this.props.postId} > textarea`
      ).value,
      postId: this.props.postId,
      forTest: this.props.admin
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
            onResizeStart={e => {
              e.preventDefault()
              document
                .querySelector(`#resizable-${this.props.postId} > textarea`)
                .focus()
            }}
          >
            <FormControl
              componentClass="textarea"
              name="content"
              placeholder="正在评论……"
              defaultValue=""
              onChange={e =>
                this.setState({
                  wordCount: e.target.value.replace(/\n|\r|\t|\s/g, '').length
                })
              }
              data-gramm_editor={false}
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
            <span
              className="editor-info pull-right unselectable"
              style={{ marginTop: '8px' }}
            >{`共 ${this.state.wordCount} 字`}</span>
          </ButtonToolbar>
        </div>
        <Recaptcha
          ref={el => (this.captcha = el)}
          sitekey="6LeaEGkUAAAAAOLDd81ewgo_R7gbHzoaMUV7NkWH"
          onResolved={this.onResolved}
          locale="zh-CN"
        />
      </div>
    )
  }
}

export default EditComment
