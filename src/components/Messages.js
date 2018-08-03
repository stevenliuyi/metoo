import React from 'react'

const Messages = props => (
  <div id="messages" className="unselectable">
    <div>2017年起 #MeToo 运动席卷全球，在中国有以下</div>
    <div id="number">{props.number}</div>
    <div>人被指控性骚扰或性侵犯。</div>
  </div>
)

export default Messages
