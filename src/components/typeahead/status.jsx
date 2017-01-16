import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import debounce from 'lodash.debounce'

export default class Status extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired
  }

  state = {
    cleared: true
  }

  componentWillReceiveProps ({ length }) {
    const hasChanged = length !== this.props.length
    const stillNoResults = length === 0
    if (hasChanged || stillNoResults) {
      this.setState({
        cleared: false
      }, () => {
        this.clearContent()
      })
    }
  }

  clearContent = debounce(() => {
    this.setState({
      cleared: true
    })
  }, 1000)

  render ({ length }, { cleared }) {
    const words = {
      result: (length === 1) ? 'result' : 'results',
      is: (length === 1) ? 'is' : 'are'
    }

    return <div
      aria-live='polite'
      role='status'
    >
      {(cleared)
        ? <span />
        : (length === 0)
          ? <span>No search results.</span>
          : <span>
            {length} {words.result} {words.is} available,
            use arrow keys or swipe to navigate.
          </span>
      }

    </div>
  }
}
