// npm
import React from 'react'
import PropTypes from 'prop-types'

// self
import MyFormViewComp from '../components/formview'

class MyFormComp extends React.Component {
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
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this, e)
  }

  render () {
    return (
      <div className='row columns'>
        <div className='medium-2 columns'>
          <MyFormViewComp le1={this.state.le1} le2={this.state.le2} le3={this.state.le3} le4={this.state.le4} />
        </div>
        <div className='medium-10 columns'>
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
                <textarea name='le4' onChange={this.onChange} value={this.state.le4} rows='8' />
              </div>
            </div>

            <div className='row'>
              <div className='medium-9 medium-offset-3 columns'>
                <input className='button expanded' type='submit' />
                <input style={{display: 'none'}} className='button expanded' type='reset' />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

MyFormComp.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default MyFormComp
