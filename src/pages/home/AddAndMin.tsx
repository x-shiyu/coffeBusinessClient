import React from "react";

const circleBox: any = {
    width: 24,
    height: 24,
    borderRadius: 15,
    background: '#ddd',
    display: 'inline-block',
    lineHeight: '23px',
    textAlign: 'center',
    color: '#222'
}
export function AddAndMin({ current, setCurrent }: { current: any, setCurrent: any }) {
    return (
        <div className='fx-between fx-h-center' style={{ height: 60, width: 80 }}>
            <span></span>

            {current > 0 ? (<>
                <span style={circleBox} onClick={() => {
                    if (current - 1 > -1) {
                        setCurrent(current - 1)
                    }
                }}>-</span>
                <span className='f20 pl10 pr10' style={{ lineHeight: '30px' }}>{current}</span></>) : undefined}
            <span style={circleBox} onClick={() => {
                if (current) {
                    setCurrent(current + 1)
                } else {
                    setCurrent(1)
                }
            }}>+</span>
        </div>
    )
}