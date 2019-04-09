import React from 'react'
import {shallow, mount} from 'enzyme'

import MessageList from './message-list'

describe('Message List', () => {
  const shallowMessageList = props => shallow(<MessageList {...props} />)
  const mountMessageList = props => mount(<MessageList {...props} />)

  it('should create component', () => {
    mountMessageList().should.have.type(MessageList)
  })

  it('should wrap children with div', () => {
    shallowMessageList().should.have.tagName('div')
  })

  it('should use passed className', () => {
    shallowMessageList({
      className: 'test-class',
    }).should.have.className('test-class')
  })

  // TODO Add more tests
})
