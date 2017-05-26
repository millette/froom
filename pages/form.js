// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

// self
import Header from '../components/progress'
import MyFormComp from '../components/form'

const onSubmit = (t, e) => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json'
  }

  const opts = {
    headers,
    method: 'POST',
    body: JSON.stringify(t.state)
  }

  fetch('http://localhost:3000/api', opts)
    .then((res) => res.json())
    .then((j) => {
      t.setState({
        le1: '',
        le2: '',
        le3: '',
        le4: '',
        msg: j
      })
    })
    .catch(console.error)
}

class MyFormPage extends React.Component {
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
          </ul>
          <MyFormComp onSubmit={onSubmit} />
        </div>
      </div>
    )
  }
}

export default MyFormPage
