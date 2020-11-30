import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import useErrorNotifier from './useErrorNotifier'
import { postFormData } from './Auth'
import './styles.css'

export default function Main() {
  const [token, setToken] = React.useState(null)
  const [ counter, setCounter ] = React.useState(0)
  const { messages, sendMessage } = useErrorNotifier(token)

  React.useEffect(() => {
    setToken(getToken())
  }, [])

  const fail = () => {
    try {
      throw Error('otro error')
    } catch(error) {
      sendMessage({ id: token, error: error })
    }
  }

  const getToken = async () => {
    try {
      const token = await postFormData({ user: {name: 'John', surName: 'Doe' }})
      console.log(token.data)
      return token.data
    } catch(error) {
      sendMessage({ id: null, error: error })
    }
  }

  return(
    <div>
      { token ? token.data : null }
      <div className='main'>
        <ErrorBoundary>
          <div className='card' >
            <Buggy counter={ counter } setCounter={ setCounter } />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div className='card' onClick={ fail }>
            ok
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div className='card'>
            <button onClick={ () => setCounter(0) }>Reset</button>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}

const Buggy = (props) => {
  
    if (props.counter === 5) {
      throw new Error('I crashed!');
    }
    return <h1 onClick={() => props.setCounter(props.counter + 1)}>{props.counter}</h1>;
}