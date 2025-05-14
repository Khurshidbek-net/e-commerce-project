import * as React from "react"
const ArrowPaginationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="M1.167 7h11.666m0 0L7 1.167M12.833 7 7 12.833"
    />
  </svg>
)
export default ArrowPaginationIcon
