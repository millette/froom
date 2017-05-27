// npm
import React from 'react'

export default ({ id, le1, le2, le3, le4 }) => <dl className='callout'>
  {id && <span><dt>ID</dt><dd>{id}</dd></span>}
  <dt>Label</dt>
  <dd>{le1}</dd>
  <dt>Mores</dt>
  <dd>{le2}</dd>
  <dt>Mores le3</dt>
  <dd>{le3}</dd>
  <dt>L4</dt>
  <dd>{le4}</dd>
</dl>
