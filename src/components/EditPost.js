import React, { Component } from 'react'
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import serializeForm from 'form-serialize'
import { submitPost } from '../utils/api'

class EditPost extends Component {
  submitPost = e => {
    e.preventDefault()
    const newPost = serializeForm(e.target, { hash: true })
    submitPost(newPost)
      .then(newPost => this.props.onSubmit(newPost))
      .then(() => this.props.onClose())
  }

  render() {
    return (
      <Form horizontal onSubmit={this.submitPost}>
        <FormGroup>
          <div id="post-content">
            <FormControl
              componentClass="textarea"
              name="content"
              placeholder="分享你的故事……"
              defaultValue=""
            />
          </div>
        </FormGroup>
        <ButtonToolbar>
          <Button className="pull-right" onClick={() => this.props.onClose()}>
            取消
          </Button>
          <Button className="pull-right" bsStyle="primary" type="submit">
            提交
          </Button>
        </ButtonToolbar>
      </Form>
    )
  }
}

export default EditPost
