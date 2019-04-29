/* eslint-disable complexity */
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Input, {Size} from '@jetbrains/ring-ui/components/input/input'
import Button from '@jetbrains/ring-ui/components/button/button'

import MessageList from '../message-list/message-list'

import './guestbook.css'
import './../app/app.css'

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
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
    name: '',
    url: '',
    message: '',
    error: false,
    validation: {
      success: true,
    },
  }

  setName = e => {
    const value = e.target.value
    this.setState(state => ({
      name: value,
      validationErrors: {
        ...state.validationErrors,
        name: null,
      },
    }))
  }

  setMessage = e => {
    const value = e.target.value
    this.setState(state => ({
      message: value,
      validationErrors: {
        ...state.validationErrors,
        message: null,
      },
    }))
  }

  setUrl = e => {
    const value = e.target.value
    this.setState(state => ({
      url: value,
      validationErrors: {
        ...state.validationErrors,
        url: null,
      },
    }))
  }

  onStartWriting = () => {
    this.setState(() => ({
      writing: true,
      name: '',
      url: '',
      message: '',
    }))
  }

  onCancelWriting = () => {
    this.setState(() => ({
      writing: false,
      name: '',
      url: '',
      message: '',
    }))
  }

  checkImgUrl(url) {
    const anchor = document.createElement('a')
    anchor.href = url
    return /\.(gif|jpg|jpeg|tiff|png)$/i.test(anchor.pathname)
  }

  validateUrlImageField = url =>
    new Promise(resolve => {
      if (!url) {
        return resolve('Image URL is not specified')
      }

      if (!this.checkImgUrl(url)) {
        return resolve('Image URL is not valid')
      }

      const imgElement = document.createElement('img')
      imgElement.src = this.src = url

      imgElement.onload = () => resolve(false)
      imgElement.onerror = () => resolve("Image doesn't exist")

      return true
    })

  validateFields = async () => {
    const {url, name, message} = this.state

    const validationErrors = {
      url: null,
      message: null,
      name: null,
    }

    if (!url) {
      validationErrors.url = 'Image URL is not specified'
    }

    if (!name) {
      validationErrors.name = 'Author is not specified'
    }

    if (!message) {
      validationErrors.message = 'Text is not specified'
    }

    validationErrors.url = await this.validateUrlImageField(url)

    return {
      success: !Object.keys(validationErrors)
        .map(fieldName => !!validationErrors[fieldName])
        .includes(true),
      validationErrors,
    }
  }

  markAsValid = () => {
    return this.setState({
      error: false,
      validationErrors: false,
    })
  }

  onSubmit = async () => {
    this.setState({
      posting: true,
    })

    const validation = await this.validateFields()

    if (!validation.success) {
      return this.setState({
        posting: false,
        validationErrors: validation.validationErrors,
      })
    }

    this.postMessage({
      author: this.state.name,
      text: this.state.message,
      url: this.state.url,
      time: moment.utc(new Date()).format(),
    }).then(message => {
      console.log('saved:')
      console.log(message)
      this.setState(({messages}) => ({
        messages: [message].concat(messages),
        posting: false,
        writing: false,
        validationErrors: false,
        error: false,
      }))
    })
  }

  async postMessage(message) {
    const url = await this.loadUrl()
    console.log('need to post: ')
    console.log(message)
    console.log(`url: ${url}`)

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
      })
        .then(r => (r.ok ? r.json() : null))
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
        headers: defaultHeaders,
      })
        .then(r => (r.ok ? r.json() : null))
        .then(r => (r ? r.url : null))
    } catch (e) {
      return null
    }
  }

  async loadMessages() {
    const url = await this.loadUrl()
    console.log(`url: ${url}`)

    if (url) {
      console.log('loading messages...')
      return await fetch(url, {
        method: 'GET',
        headers: defaultHeaders,
      }).then(r => (r.ok ? r.json() : null))
    } else {
      return []
    }
  }

  componentDidMount() {
    this.loadMessages().then(loadedData => {
      console.log('loaded data:')
      console.log(loadedData)
      const loadedMessages = loadedData.messages
      this.setState(() => ({
        messages:
          loadedMessages && loadedMessages.length
            ? loadedMessages.map(m => ({
                author: m.name,
                url: m.img_url,
                text: m.msg,
                time: m.datetime,
              }))
            : [],
      }))
    })
  }

  render() {
    const {...restProps} = this.props
    const {error, validationErrors} = this.state
    return (
      <div className="guestbook">
        {(error && 'Something is going wrong') || null}
        {!this.state.writing && (
          <Button primary onClick={this.onStartWriting}>
            {'Leave us a message!'}
          </Button>
        )}
        {this.state.writing && (
          <div {...restProps} className="form">
            <div>
              <form onSubmit={this.onSubmit}>
                <Input
                  label="Name"
                  value={this.state.name}
                  onChange={this.setName}
                  error={validationErrors && validationErrors.name}
                />
                <Input
                  label="Image URL"
                  value={this.state.url}
                  onChange={this.setUrl}
                  size={Size.L}
                  error={validationErrors && validationErrors.url}
                />
                <Input
                  label="Message"
                  value={this.state.message}
                  onChange={this.setMessage}
                  size={Size.L}
                  multiline
                  error={validationErrors && validationErrors.message}
                />
                <div>
                  <Button primary loader={this.state.posting} onClick={this.onSubmit}>
                    {'Post!'}
                  </Button>
                  &nbsp;
                  <Button onClick={this.onCancelWriting}>{'Cancel'}</Button>
                </div>
              </form>
            </div>
            <div className="preview">
              {this.state.url && this.checkImgUrl(this.state.url) && (
                <img src={this.state.url} className="image" />
              )}
            </div>
          </div>
        )}
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}
