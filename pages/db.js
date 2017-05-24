import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

export default class MyDBPage extends React.Component {
  static async getInitialProps (yo) {
    const host = (yo.req && yo.req.headers && yo.req.headers.host) ||
      (window !== 'undefined' && window.location.host)
    if (!host) { throw new Error('Weird host thing.') }
    const u = [host.indexOf('.') === -1 ? 'http:/' : 'https:/', host, 'api']
    if (yo.query.what) { u.push(yo.query.what) }
    const res = await fetch(u.join('/'))
    return res.ok ? res.json() : { oups: res.status, ouch: res.statusText }
  }

  render () {
    return (
      <div>
        <p>DB...</p>
        <ul>
          <li><Link href='/'><a>TOP</a></Link></li>
          <li><Link href='/db'><a>db</a></Link></li>
          <li><Link href='/db?what=_design/auth' as='/db/_design/auth'><a>_design/auth</a></Link></li>
          <li><Link href='/db?what=_all_docs' as='/db/_all_docs'><a>_all_docs</a></Link></li>
        </ul>
        <pre>
          {JSON.stringify(this.props, null, ' ')}
        </pre>
      </div>
    )
  }
}
