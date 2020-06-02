import React, { useState } from 'react'

import ReactNipple from 'react-nipple'
// import DebugView from 'react-nipple/lib/DebugView'
import 'react-nipple/lib/styles.css'

export default function Controls({ options, width, height }) {
  const [state, setState] = useState()

  const handleJoystickStart = (evt, data) => {
    console.log('handleJoystickStart', data)
    setState(data)
  }

  const handleJoystickEnd = (evt, data) => {
    console.log('handleJoystickEnd', data)
    setState(data)
  }

  const handleJoystickMove = (evt, data) => {
    console.log('handleJoystickMove', data)

    // setState({ data })
  }

  // const handleJoystickDir = (evt, data) => {
  //   setState({ data })
  // }

  // const handleJoystickPlain = (evt, data) => {
  //   setState({ data })
  // }

  // const handleJoystickShown = (evt, data) => {
  //   setState({ data })
  // }

  // const handleJoystickHidden = (evt, data) => {
  //   setState({ data })
  // }

  // const handleJoystickPressure = (evt, data) => {
  //   setState({ data })
  // }

  console.log(state)

  return (
    <div className="sticks">
      <ReactNipple
        className="joystick"
        style={{
          outline: `1px dashed red`,
          width: 250,
          height: 250
        }}
        options={{
          mode: 'static',
          color: 'blue',
          position: { top: '50%', left: '50%' },
          lockX: true
        }}
      />

      <ReactNipple
        className="joystick"
        style={{
          outline: `1px dashed blue`,
          width: 250,
          height: 250
        }}
        options={{
          mode: 'static',
          color: 'blue',
          position: { top: '50%', left: '50%' },
          lockY: true
        }}
        onStart={handleJoystickStart}
        onEnd={handleJoystickEnd}
        onMove={handleJoystickMove}
      />
      {/*
      <ReactNipple
        className="joystick"
        options={options}
        style={{
          outline: `1px dashed ${options.color}`,
          width,
          height
        }}
        onStart={handleJoystickStart}
        onEnd={handleJoystickEnd}
        onMove={handleJoystickMove}
        // onDir={handleJoystickDir}
        // onPlain={handleJoystickPlain}
        // onShown={handleJoystickShown}
        // onHidden={handleJoystickHidden}
        // onPressure={handleJoystickPressure}
      /> 
      */}
      {/* <DebugView data={state.data} /> */}
    </div>
  )
}
