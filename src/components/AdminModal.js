import React, { Component } from 'react'
import { Modal, Row, FormControl, Button, ButtonToolbar } from 'react-bootstrap'

class AdminModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body
          style={{ textAlign: 'center' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ padding: '20px' }}>
            <Row>
              <FormControl
                type="text"
                value={this.props.adminKey}
                placeholder="管理员密码"
                onChange={this.props.onChangeKey}
              />
            </Row>
            <Row>
              <ButtonToolbar style={{ marginTop: '15px' }}>
                <Button className="pull-right" onClick={this.props.onHide}>
                  取消
                </Button>
                <Button
                  bsStyle="primary"
                  className="pull-right"
                  onClick={this.props.onSubmit}
                >
                  确认删除
                </Button>
              </ButtonToolbar>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AdminModal
