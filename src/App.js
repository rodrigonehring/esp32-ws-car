import React, { useEffect } from 'react'
import Controls from './Controls'
import './App.css'

function ButtonPress({ ws, children, action }) {
  const handleIn = (e) => {
    e.preventDefault()
    ws.send(action + '1')
  }

  const handleOut = (e) => {
    e.preventDefault()
    ws.send(action + '0')
  }

  return (
    <button onPointerDown={handleIn} onPointerUp={handleOut}>
      {children}
    </button>
  )
}

function App() {
  const [state, setState] = React.useState({ ip: '192.168.0.28' })
  const ref = React.useRef()

  const handleConnect = () => {
    const url = `ws://${state.ip}:80`
    console.log('connect to: %s', url)

    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('Connected!')
      setState((s) => ({ ...s, connected: true }))
    }

    ws.onclose = () => {
      console.log('Disconnected!')
      setState((s) => ({ ...s, connected: false }))
    }

    ws.onmessage = (event) => {
      console.log('received message:', event.data)
    }

    ref.current = ws
  }

  useEffect(handleConnect, [])

  return (
    <div className="App">
      <input
        type="text"
        name="ip"
        placeholder="ip"
        value={state.ip}
        onChange={(e) => setState((s) => ({ ...s, ip: e.target.value }))}
        disabled={state.connected}
      />
      <button onClick={handleConnect} disabled={state.connected}>
        connect
      </button>

      {state.connected && (
        <>
          <Controls ws={ref.current} />
          <ButtonPress ws={ref.current} action="led">
            LED
          </ButtonPress>
        </>
      )}
    </div>
  )
}

export default App
