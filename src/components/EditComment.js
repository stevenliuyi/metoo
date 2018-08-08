import React, { Component } from 'react'
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import serializeForm from 'form-serialize'
import { submitComment } from '../utils/api'

class EditComment extends Component {
  submitComment = e => {
    e.preventDefault()
    let newComment = serializeForm(e.target, { hash: true })
    newComment.postId = this.props.postId
    submitComment(newComment)
      .then(newComment => this.props.onSubmit(newComment))
      .then(() => this.props.onClose())
  }

  render() {
    return (
      <div className="edit-comment">
        <Form horizontal onSubmit={this.submitComment}>
          <FormGroup>
            <div className="edit-content">
              <FormControl
                componentClass="textarea"
                name="content"
                placeholder="在此输入评论内容"
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
      </div>
    )
  }
}

export default EditComment
