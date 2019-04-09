import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Input, {Size} from '@jetbrains/ring-ui/components/input/input'
import Button from '@jetbrains/ring-ui/components/button/button'

import MessageList from "../message-list/message-list"

import './guestbook.css'
import './../app/app.css'

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json'
}

export default class Guestbook extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  state = {
    messages: [],
    posting: false,
    writing: false,
    name: "",
    url: "",
    message: "",
  }

  setName = e => {
    this.setState({
      name: e.target.value
    });
  };

  setMessage = e => {
    this.setState({
      message: e.target.value
    });
  };


  setUrl = e => {
    this.setState({
      url: e.target.value,
    });
  };

  onStartWriting = () => {
    this.setState(() => ({
      writing: true,
      name: "",
      url: "",
      message: "",
    }))
  }

  onCancelWriting = () => {
    this.setState(() => ({
      writing: false,
      name: "",
      url: "",
      message: "",
    }))
  }

  onClick = () => {

    this.setState(({posting}) => ({
      posting: true
    }))

    const self = this

    this.postMessage({author: this.state.name, text: this.state.message, url: this.state.url, time: moment.utc(new Date()).format()})
      .then(message => {console.log('saved:'); console.log(message)
        this.setState(({messages}) => ({
        messages: [message].concat(messages),
        posting: false,
        writing: false,
      }))})

  }

  async postMessage(message) {
    const url = await this.loadUrl()
    console.log('need to post: ')
    console.log(message)
    console.log('url: ' + url)

    if (url) {
      console.log('posting message...')
      return await fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          name: message.author,
          img_url: message.url,
          msg: message.text,
          datetime: message.time,
        }),
      }).then(r => r.ok ? r.json() : null)
        .then(r => message)
    } else {
      console.log('saving only locally')
      return Promise.resolve(message)
    }
  }

  async loadUrl() {
    console.log('checking url...')
    try {
      return fetch('config.json', {
        method: 'GET',
        headers: defaultHeaders
      }).then(r => r.ok ? r.json() : null)
        .then(r => r ? r.url : null)
    } catch (e) {
      return null
    }
  }

  async loadMessages() {
    const url = await this.loadUrl()
    console.log('url: ' + url)

    if (url) {
      console.log('loading messages...')
      return await fetch(url, {
        method: 'GET',
        headers: defaultHeaders
      }).then(r => r.ok ? r.json() : null)
    } else {
      return []
    }
  }

  componentDidMount() {
    this.loadMessages().then(loadedData => {
      console.log("loaded data:")
      console.log(loadedData)
      const loadedMessages = loadedData.messages
      this.setState(() => ({
        messages: loadedMessages && loadedMessages.length ? loadedMessages.map(m =>
          ({author: m.name, url: m["img_url"], text: m.msg, time: m.datetime})): []
      }))
    })
  }

  render() {
    const {children, className, ...restProps} = this.props

    return (
      <div className='guestbook'>
        {!this.state.writing && <Button primary onClick={this.onStartWriting}>Leave us a message!</Button>}
        {this.state.writing &&
        <div
          {...restProps}
          className='form'
        >
          <div>
            <form>
              <Input label="Name" value={this.state.name} onChange={this.setName}/>
              <Input label="Image URL" value={this.state.url} onChange={this.setUrl} size={Size.L}/>
              <Input label="Message" value={this.state.message} onChange={this.setMessage} size={Size.L} multiline/>
              <div><Button primary loader={this.state.posting} onClick={this.onClick}>Post!</Button>&nbsp;
                <Button onClick={this.onCancelWriting}>Cancel</Button></div>
            </form>
          </div>
          <div className='preview'>{this.state.url && <img src={this.state.url} className='image'/>}</div>
        </div>}
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
}
