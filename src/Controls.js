import React, { useState, useCallback, useEffect, useRef } from 'react'

import nipplejs from 'nipplejs'
import { throttle } from 'throttle-debounce'

function ReactNipple({ options, onMove, onEnd }) {
  const ref = useRef()
  const np = useRef()

  useEffect(() => {
    np.current = nipplejs.create({ ...options, zone: ref.current })

    return () => {
      np.current.destroy()
    }
  }, [options])

  useEffect(() => {
    if (!np.current) return
    np.current.on('move', onMove)
  }, [onMove])

  useEffect(() => {
    if (!np.current) return
    np.current.on('end', onEnd)
  }, [onEnd])

  return (
    <div style={{ width: 250, height: 250, position: 'relative' }}>
      <div ref={ref} />
    </div>
  )
}

const optionsY = {
  mode: 'static',
  color: 'red',
  lockY: true,
  position: { top: '50%', left: '50%' }
}

export default function Controls({ ws }) {
  const [moveY, setMoveY] = useState('')

  useEffect(() => {
    if (moveY) {
      ws.send(moveY)
    }
  }, [moveY, ws])

  const handleMoveY = useCallback(
    throttle(100, (evt, data) => {
      const speed = Math.floor(((data.distance / 50) * 100) / 20)

      let dir = 'f'

      if (Math.abs(data.angle.degree) < 180) {
        dir = 'b'
      }

      setMoveY(`moveY-${dir}-${speed}`)
    }),
    []
  )

  const handleJoystickEnd = useCallback(() => {
    setTimeout(() => {
      setMoveY('moveY-stop')
    }, 100)
  }, [])

  // const handleJoystickMove = (evt, data) => {
  //   console.log('handleJoystickMove', data)

  //   // setState({ data })
  // }

  // const handleJoystickDir = (evt, data) => {
  //   console.log('handleJoystickDir', data)
  // }

  // const handleJoystickPlain = (evt, data) => {
  //   console.log('handleJoystickPlain', data)
  // }

  // const handleJoystickShown = (evt, data) => {
  //   console.log('handleJoystickShown', data)
  // }

  // const handleJoystickHidden = (evt, data) => {
  //   console.log('handleJoystickHidden', data)
  // }

  // const handleJoystickPressure = (evt, data) => {
  //   console.log('handleJoystickPressure', data)
  // }

  const common = (options) => ({
    options: { mode: 'static', position: { top: '50%', left: '50%' }, ...options }
  })

  return (
    <div className="sticks">
      <ReactNipple {...common({ color: 'blue', lockX: true })} />

      <ReactNipple
        options={optionsY}
        onEnd={handleJoystickEnd}
        onMove={handleMoveY}
        // onDir={handleJoystickDir}
        // onPlain={handleJoystickPlain}
        // onShown={handleJoystickShown}
        // onHidden={handleJoystickHidden}
        // onPressure={handleJoystickPressure}
      />

      {/* <DebugView data={state.data} /> */}
    </div>
  )
}
