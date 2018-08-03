import React from 'react'
import SortButton from './SortButton'
import { sort } from '../utils/utils'

const AvatarGrid = props => (
  <div id="people-grid-wrapper">
    <SortButton {...props} />
    <div id="people-grid">
      {sort(props.data, props.sortMethod).map(name => (
        <div
          className={`person unselectable ${
            props.currentPerson === name ? 'person-highlight' : ''
          }`}
          key={`person-${name}`}
          onClick={() => props.updatePerson(name)}
        >
          <img
            className="thumb"
            src={
              props.data[name].photo != null
                ? `/images/${props.data[name].photo}`
                : '/images/avatar.jpg'
            }
            width={72}
            height={72}
            alt={name}
          />
          <div className="person-name">{name}</div>
        </div>
      ))}
    </div>
  </div>
)

export default AvatarGrid
