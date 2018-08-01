import React, { Component } from 'react';

class PersonDetail extends Component {
  render() {
    return (
      <div id='detail-box'>
        <div id='detail'>
          <div>{ this.props.name }</div>
          <div id='intro'>{ this.props.data.intro }</div>
        </div>
        <div id='quote'>
          { `“${this.props.data.quote }”` }
        </div>
      </div>
    );
  }
}

export default PersonDetail
