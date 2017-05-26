// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import pick from 'lodash.pick'

// self
import Header from '../components/progress'
import MyFormViewComp from '../components/formview'
import utils from '../utils'

export default class MyAyePage extends React.Component {
  static async getInitialProps (yo) {
    yo.query.what = '_all_docs'
    const u = utils.dbUrl(yo)
    const res = await fetch(u + '?include_docs=true')
    return res.ok ? res.json() : pick(res, 'status', 'statusText')
  }

  render () {
    return <div>
      <Header>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css' integrity='sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=' crossorigin='anonymous' />
      </Header>
      <div className='row columns'>
        <ul className='menu'>
          <li><Link href='/'><a>TOP</a></Link></li>
          <li><Link href='/db'><a>DB</a></Link></li>
        </ul>
        {this.props.rows.map((row) => <MyFormViewComp key={row.id} le4={row.doc && Object.keys(row.doc).join(', ')} le3={typeof row.doc} le1={row.id} le2={row.value.rev} />)}
      </div>
    </div>
  }
}
