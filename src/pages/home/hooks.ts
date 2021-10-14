import { usePersistFn } from 'ahooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
export const createHander = (): { useData: any } => {
    let _data: any[] = []
    let bindCom: any[] = []
    function setData(value: any[]) {
        _data = value
        bindCom.forEach((setFn) => {
            setFn(value)
        })
    }
    const useData = () => {
        const [state, setState] = useState()
        bindCom.push(setState)
        return [state, setData]
    }

    return {
        useData
    }
}


export function getActiveId() {
    const { id } = useParams<{ id: any }>()
    return [id]
}