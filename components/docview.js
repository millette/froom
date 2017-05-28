// npm
import React from 'react'
import Link from 'next/link'

export default ({ single, createdAt, id, le1, le2, le3, le4 }) => <div className='callout'>
  {single && <h1>
    {le1}
    {id && <small> {id}</small>}
  </h1>}
  {!single && <h2>
    <Link as={'/aye/' + id} href={{ pathname: '/aye', query: { id } }}>
      <a>
        {le1}
        {id && <small> {id}</small>}
      </a>
    </Link>
  </h2>}
  <h3>
    {le2}
    {createdAt && <small> {createdAt}</small>}
  </h3>
  <p>{le3}</p>
  <p>{le4}</p>
</div>
