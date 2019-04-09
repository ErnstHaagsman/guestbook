import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import './message-list.css'
import Message from '../message/message'

export default class MessageList extends PureComponent {
  static propTypes = {
    messages: PropTypes.array,
  }

  render() {
    const {children, className, messages, ...restProps} = this.props;
    const result = []
    messages.forEach(m => result.push(<Message author={m.author} text={m.text} url={m.url} time={m.time} key={m.time}/>))
    return (
      <div className='messageList'>
        {result.length > 0 && result}
        {result.length === 0 && <div className='emptyList'>There are no messages yet. Be the first!</div>}
      </div>
    )
  }
}
