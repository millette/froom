import Link from 'next/link'

export default () => <div>
  <p>Hello!</p>
  <ul>
    <li><Link href='/db'><a>DB</a></Link></li>
    <li><Link href='/b' as='/a'><a>a</a></Link></li>
    <li><Link href='/a' as='/b'><a>b</a></Link></li>
  </ul>
</div>
