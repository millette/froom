// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import pick from 'lodash.pick'

// self
import Header from '../components/progress'
import utils from '../utils'

export default class MyDBPage extends React.Component {
  static async getInitialProps (yo) {
    const u = utils.dbUrl(yo)
    const res = await fetch(u)
    return res.ok ? res.json() : pick(res, 'status', 'statusText')
  }

  render () {
    return (
      <div>
        <Header />
        <p>DB...</p>
        <ul>
          <li><Link href='/'><a>TOP</a></Link></li>
          <li><Link href='/form'><a>Form</a></Link></li>
          <li><Link href='/db'><a>db</a></Link></li>
          <li><Link href='/db?what=_design/auth' as='/db/_design/auth'><a>_design/auth</a></Link></li>
          <li><Link href='/db?what=_all_docs' as='/db/_all_docs'><a>_all_docs</a></Link></li>
          <li><Link href='/aye'><a>AYE</a></Link></li>
        </ul>
        <pre>
          {JSON.stringify(this.props, null, ' ')}
        </pre>
      </div>
    )
  }
}
