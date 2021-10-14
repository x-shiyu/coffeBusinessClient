import React from "react";

export default function Icon({ prefix = 'icon', name }: { prefix?: string, name: string }) {
    return <svg style={{ width: 22, height: 22 }} aria-hidden="true" >
        <use xlinkHref={`#${prefix}-${name}`} />
    </svg>
}