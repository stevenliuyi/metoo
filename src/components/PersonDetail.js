import React, { Component } from 'react';
import { Label } from 'react-bootstrap'
import Links from './Links'

class PersonDetail extends Component {
  render() {
    const { intro, date, details, accusations, links, wikipedia, zhihu, quote, quoteby } = this.props.data
    return (
      <div id='detail-box'>
        <div id='person-information'>
          <div>{ this.props.name }</div>
          <div className='intro'>{ intro }</div>
          <div className='intro'>
          {
            `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日被指控`
          }
          </div>
          <div id='detail'>{ details }</div>
          { accusations &&
            <span className='link' style={{ marginRight: '10px' }}><Label>指控</Label>
              <Links links={accusations} />
            </span>
          }
          { (links || wikipedia || zhihu) &&
            <span className='link'><Label>链接</Label>
              <Links links={links} />
              <Links links={wikipedia} type='wikipedia' />
              <Links links={zhihu} type='zhihu' />
            </span>
          }
        </div>
        <div id='quote'>
          { `“${quote}”` }
          <div id='quote-by'>
            { `── ${quoteby}` }
          </div>
        </div>
      </div>
    );
  }
}

export default PersonDetail
