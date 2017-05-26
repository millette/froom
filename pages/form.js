// npm
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

// self
import Header from '../components/progress'
import MyFormComp from '../components/form'

const onSubmit = (t, e) => {
  console.log('SUB666:', t)
  console.log('SUB777:', t.state)
  console.log('SUB777:', e.target)
  t.setState({
    le1: '',
    le2: '',
    le3: '',
    le4: '',
  })
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
