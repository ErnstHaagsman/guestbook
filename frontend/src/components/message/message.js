import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './message.css'
import './../app/app.css'
import Text from '@jetbrains/ring-ui/components/text/text'

export default class Message extends PureComponent {
  static propTypes = {
    author: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
    time: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const {author, text, url, time} = this.props

    return (
      <div className="message">
        <div className="info">
          <span className="author">{author}</span>
          <span>
            ,{' '}
            {moment(time)
              .startOf(time)
              .fromNow()}
          </span>
        </div>
        <div>{url && <img src={url} className="imageInMessage" />}</div>
        <Text>{text}</Text>
      </div>
    )
  }
}
