import React, {Component} from 'react'
import Header, {Logo} from '@jetbrains/ring-ui/components/header/header'
import Footer from '@jetbrains/ring-ui/components/footer/footer'
import jbLogo from '@jetbrains/logos/jetbrains/jetbrains.svg'

import './app.css'
import Guestbook from '../guestbook/guestbook'

export default class AppRoot extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header>
          <a href="/">
            <Logo
              glyph={jbLogo}
              size={Logo.Size.Size48}
            />
          </a>
          <span>Guestbook</span>
        </Header>
        <div className="app-content">
          <Guestbook/>
        </div>
      </div>
    )
  }
}
