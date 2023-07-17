import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.672 6.763L5.58 15.854l-.166 2.995 2.995-.166L17.5 9.59m-2.828-2.828l1.348-1.349a2 2 0 012.829 0v0a2 2 0 010 2.829v0L17.5 9.59m-2.828-2.828L17.5 9.591"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
