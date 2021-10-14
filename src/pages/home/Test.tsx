import React from "react"

import { useData } from "./orderHandler"

export function Test() {
    const [state, setState] = useData()
    return <div className='ceee'>
        <p> {state}</p>
        <button onClick={() => {
            setState([1, 2, 3])
        }}>click</button>
    </div>
}