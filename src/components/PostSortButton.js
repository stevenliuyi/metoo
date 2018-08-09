import React from 'react'
import {
  DropdownButton,
  MenuItem,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import { MdSort, MdDone } from 'react-icons/md'

const PostSortButton = props => (
  <span id="post-sort-button">
    <DropdownButton
      noCaret
      id="post-sort-dropdown"
      title={
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="home">排序</Tooltip>}
        >
          <span className="treehole-button">
            <MdSort size={30} />
          </span>
        </OverlayTrigger>
      }
      onSelect={props.sortToggle}
    >
      {['最新发贴', '最早发贴', '最多回复'].map((method, idx) => (
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
  </span>
)

export default PostSortButton
