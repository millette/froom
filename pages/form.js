// npm
import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

// self
import Header from '../components/progress'

class MyFormPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // necessary for controlled component
      // https://facebook.github.io/react/docs/forms.html#controlled-components
      le1: '',
      le2: '',
      le3: '',
      le4: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (x) {
    const obj = {}
    obj[x.target.name] = x.target.value
    this.setState(Object.assign({}, this.state, obj))
    if (this.props.onChange) { this.props.onChange(this, x) }
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.props.onSubmit) { this.props.onSubmit(this, e) }
  }

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
          <dl>
            <dt>Label</dt>
            <dd>{this.state.le1}</dd>
            <dt>Mores</dt>
            <dd>{this.state.le2}</dd>
            <dt>Mores le3</dt>
            <dd>{this.state.le3}</dd>
            <dt>L4</dt>
            <dd>{this.state.le4}</dd>
          </dl>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='row'>
              <div className='medium-3 columns'>
                <label htmlFor='right-label' className='middle medium-text-right'>Label</label>
              </div>
              <div className='medium-9 columns'>
                <input name='le1' onChange={this.onChange} value={this.state.le1} type='text' id='right-label' placeholder='Right-aligned text input' />
              </div>
            </div>

            <div className='row'>
              <div className='medium-3 columns'>
                <label htmlFor='right-label2' className='middle medium-text-right'>Label but Longer</label>
              </div>
              <div className='medium-9 columns'>
                <input name='le2' onChange={this.onChange} value={this.state.le2} type='text' id='right-label2' placeholder='Right-aligned text input' />
              </div>
            </div>

            <div className='row'>
              <div className='medium-3 columns'>
                <label htmlFor='right-label3' className='middle medium-text-right'>Longest, hugest, Trumpest!</label>
              </div>
              <div className='medium-9 columns'>
                <input name='le3' onChange={this.onChange} value={this.state.le3} type='text' id='right-label3' placeholder='Right-aligned text input' />
              </div>
            </div>

            <div className='row'>
              <div className='medium-3 columns'>
                <label htmlFor='right-label3' className='medium-text-right'>Comment</label>
              </div>
              <div className='medium-9 columns'>
                <textarea name='le4' onChange={this.onChange} value={this.state.le4} rows='8'></textarea>
              </div>
            </div>

            <div className='row'>
              <div className='medium-9 medium-offset-3 columns'>
                <input className='button expanded' type='submit' />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

MyFormPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

MyFormPage.defaultProps = {
  onChange: (t, a) => { console.log('CHANGE:', t, a) },
  onSubmit: (t, e) => { console.log('SUB2:', t, e) }
}

export default MyFormPage
