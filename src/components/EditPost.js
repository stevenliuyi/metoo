import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { submitPost } from '../utils/api'

class EditPost extends Component {
  submitPost = e => {
    e.preventDefault()
    const newPost = {
      content: document.querySelector('#post-content > textarea').value
    }
    submitPost(newPost).then(newPost => {
      this.props.onSubmit(newPost)
      this.props.onClose()
    })
  }

  render() {
    return (
      <ResizableBox
        height={window.innerHeight * 0.25}
        width={Infinity}
        minConstraints={[0, 80]}
        maxConstraints={[Infinity, window.innerHeight * 0.8]}
        axis="y"
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
              onClick={this.submitPost}
            >
              提交
            </Button>
          </ButtonToolbar>
        </div>
      </ResizableBox>
    )
  }
}

export default EditPost
