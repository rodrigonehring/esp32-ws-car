import React from 'react'
import Controls from './Controls'
import './App.css'

const ip = '192.168.0.28'
const url = `ws://${ip}:80`

function App() {
  React.useEffect(() => {
    const ws = new WebSocket(url)
    console.log('mount?', ws)

    ws.onmessage = (event) => {
      console.log('received message:', event.data)
    }

    window.ws = ws
  }, [])

  const handleMouseDown = (e) => {
    console.log('handleMouseDown')
  }

  const handleMouseUp = (e) => {
    console.log('handleMouseUp')
  }

  return (
    <div className="App">
      <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        press me
      </button>

      <input type="text" name="ip" placeholder="ip" value={ip} />

      <Controls />
    </div>
  )
}

export default App
