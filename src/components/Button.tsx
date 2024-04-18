import React, { ReactNode } from 'react'
import "./Button.css"

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    children: ReactNode
}

const Button =  ({ onClick, children }: Props) => {
    return (
        <button className="button" onClick={onClick}>{children}</button>
    )
}

export default Button
