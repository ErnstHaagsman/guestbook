import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './message.css'
import './../app/app.css'
import Text from '@jetbrains/ring-ui/components/text/text'

const calculateTime = time =>
  moment(time)
    .startOf(time)
    .fromNow()
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
        {url && (
          <div className="messageImageContainer">
            <div className="messageImageFade" />
            <img src={url} className="messageImage" />
          </div>
        )}
        <div className="description">
          <div className="info">
            <span className="author">{`${author}, `}</span>
            <span>{`${calculateTime(time)}`}</span>
          </div>
          <Text className="text">{text}</Text>
        </div>
      </div>
    )
  }
}
