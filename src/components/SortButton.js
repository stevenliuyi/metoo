import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { MdSort, MdDone } from 'react-icons/md'

const SortButton = props => (
  <div className="sort-button">
    <DropdownButton
      noCaret
      id="sort-dropdown"
      title={
        <span id="sort-icon">
          <MdSort id="sort-main" size={30} />
          <MdSort id="sort-outline" size={30} />
        </span>
      }
      onSelect={props.sortToggle}
    >
      {['按拼音排序', '按指控日期排序'].map((method, idx) => (
        <MenuItem key={`menutiem-${idx}`} eventKey={idx + 1}>
          {method}{' '}
          <span
            className={`check-icon ${
              props.sortMethod === idx + 1 ? '' : 'unchecked'
            }`}
          >
            <MdDone size={12} />
          </span>
        </MenuItem>
      ))}
    </DropdownButton>
  </div>
)

export default SortButton
