import React, { Component } from 'react'
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdSearch } from 'react-icons/md'

class SearchPost extends Component {
  render() {
    return (
      <div id="search-box">
        <FormControl
          id="search-text"
          type="text"
          placeholder="搜索"
          value={this.props.searchText}
          onKeyPress={e => {
            if (e.key === 'Enter') this.props.onSearch()
          }}
          onChange={this.props.onChange}
        />
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="search-text-tooltip">点击搜索</Tooltip>}
        >
          <span id="search-icon" onClick={this.props.onSearch}>
            <MdSearch size={24} />
          </span>
        </OverlayTrigger>
      </div>
    )
  }
}

export default SearchPost
