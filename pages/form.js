// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

// self
import Header from '../components/progress'
import MyFormComp from '../components/form'
import utils from '../utils'

class MyFormPage extends React.Component {
  static async getInitialProps (yo) {
    return { u: utils.dbUrl(yo) }
  }

  onSubmit (t, e) {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json'
    }

    // TODO: move this to routes.js (server-side only)
    const now = Date.now()
    // TODO: left-pad random for 0
    const _id = `comment:${now}${Math.floor(Math.random() * 10)}`
    const doc = Object.assign({ _id, createdAt: new Date(now).toISOString() }, t.state)

    const opts = {
      headers,
      method: 'POST',
      body: JSON.stringify(doc)
    }

    fetch(this.props.u, opts)
      .then((res) => res.json())
      .then((j) => t.resetClick(j))
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <Header>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css' integrity='sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=' crossorigin='anonymous' />
        </Header>

        <div className='row columns'>
          <ul className='menu'>
            <li><Link href='/'><a>TOP</a></Link></li>
            <li><Link href='/db'><a>DB</a></Link></li>
            <li><Link href='/aye'><a>AYE</a></Link></li>
          </ul>
          <MyFormComp onSubmit={this.onSubmit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default MyFormPage
