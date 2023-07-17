import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RedAlert(props:any) {
  return (
    <Svg
      width={194}
      height={194}
      viewBox="0 0 194 194"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M87.3 155.2h19.4v-19.4H87.3v19.4zM97 0a97 97 0 100 194A97 97 0 0097 0zm0 174.6c-42.777 0-77.6-34.823-77.6-77.6 0-42.777 34.823-77.6 77.6-77.6 42.777 0 77.6 34.823 77.6 77.6 0 42.777-34.823 77.6-77.6 77.6zm0-135.8a38.8 38.8 0 00-38.8 38.8h19.4a19.4 19.4 0 1138.8 0c0 19.4-29.1 16.975-29.1 48.5h19.4c0-21.825 29.1-24.25 29.1-48.5A38.801 38.801 0 0097 38.8z"
        fill="#F52C2C"
      />
    </Svg>
  )
}

export default RedAlert