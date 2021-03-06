// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import pick from 'lodash.pick'

// self
import Header from '../components/progress'
import DocViewComp from '../components/docview'
import utils from '../utils'

export default class MyAyePage extends React.Component {
  static async getInitialProps (yo) {
    if (yo.query.id) {
      const u = utils.dbUrl(yo)
      const res = await fetch([u, yo.query.id].join('/'))
      return res.ok ? res.json() : pick(res, 'status', 'statusText')
    }
    yo.query.what = '_all_docs'
    const u = utils.dbUrl(yo)
    const res = await fetch(u + '?include_docs=true&descending=true&endkey="comment:"&startkey="comment:\\ufff0"')
    return res.ok ? res.json() : pick(res, 'status', 'statusText')
  }

  render () {
    const a = (
      this.props.rows && this.props.rows.map((row) => <DocViewComp key={row.id} le1={row.doc.le1} le2={row.doc.le2} le3={row.doc.le3} le4={row.doc.le4} id={row.id} />)
    )

    const b = (
      <DocViewComp single createdAt={this.props.createdAt} le1={this.props.le1} le2={this.props.le2} le3={this.props.le3} le4={this.props.le4} id={this.props._id} />
    )

    const c = this.props.rows ? a : b

    return <div>
      <Header>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css' integrity='sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=' crossorigin='anonymous' />
      </Header>
      <div className='row columns'>
        <ul className='menu'>
          <li><Link href='/'><a>TOP</a></Link></li>
          <li><Link href='/form'><a>Form</a></Link></li>
          <li><Link href='/db'><a>DB</a></Link></li>
          <li><Link href='/aye'><a>AYE</a></Link></li>
        </ul>
        {c}
      </div>
    </div>
  }
}
