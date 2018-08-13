import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Header = props => (
  <div>
    <div
      className={`h1 unselectable${props.onClick != null ? ' title' : ''}`}
      onClick={props.onClick}
    >
      <strong>
        <span
          className={props.onClickLeft ? 'title' : ''}
          onClick={props.onClickLeft}
        >
          #MeToo
        </span>{' '}
        <span id="times">
          <FaTimes size={30} />
        </span>{' '}
        <span
          className={props.onClickRight ? 'title' : ''}
          onClick={props.onClickRight}
        >
          {props.title}
        </span>
      </strong>
    </div>
    <div id="subtitle" className="text-muted">
      人类历史上最大规模的屠杀，是房思琪式的强暴。
    </div>
  </div>
)

export default Header
