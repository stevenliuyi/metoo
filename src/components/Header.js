import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Header = props => (
  <div>
    <div id="title" className="h1 unselectable" onClick={props.onClick}>
      <strong>
        #MeToo{' '}
        <span id="times">
          <FaTimes size={30} />
        </span>{' '}
        {props.title}
      </strong>
    </div>
    <div id="subtitle" className="text-muted">
      人类历史上最大规模的屠杀，是房思琪式的强暴。
    </div>
  </div>
)

export default Header
