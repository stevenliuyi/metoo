import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col
} from 'react-bootstrap'
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
          <Col componentClass={ControlLabel} sm={2}>
            姓名
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="name"
              placeholder="选填"
              defaultValue=""
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            电子邮件
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              name="email"
              placeholder="选填"
              defaultValue=""
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            内容
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              name="content"
              placeholder="分享你的故事……"
              defaultValue=""
            />
          </Col>
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
