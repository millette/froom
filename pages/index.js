// npm
import React from 'react'
import Link from 'next/link'
import Header from '../components/progress'

export default () => <div>
  <Header />
  <p>Hello!</p>
  <ul>
    <li><Link href='/db'><a>DB</a></Link></li>
    <li><Link href='/form'><a>Form</a></Link></li>
  </ul>
  <p>Goodbye</p>
</div>
