import React from 'react'
import { Link } from 'react-router-dom'
import SortButton from './SortButton'
import { sort } from '../utils/utils'

const AvatarGrid = props => (
  <div id="people-grid-wrapper">
    <SortButton {...props} />
    <div id="people-grid">
      {sort(props.data, props.sortMethod).map(name => (
        <Link to={`/${name.replace('_', '-')}`} key={`person-${name}`}>
          <div
            className={`person unselectable ${
              props.currentPerson === name ? 'person-highlight' : ''
            }`}
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
            <div className="person-name">{props.data[name].name}</div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default AvatarGrid
