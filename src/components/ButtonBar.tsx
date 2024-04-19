import { ReactNode } from 'react'
import "./ButtonBar.css"

const ButtonBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="button-bar">
      {children}
    </div>
  )
}

export default ButtonBar
