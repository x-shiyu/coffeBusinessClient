import React, { useState, useEffect, useMemo } from "react";
import style from './style.module.css'
import { CoffeInfo, getCoffes } from './service'
import { getActiveId } from './hooks'
import { useHistory } from "react-router";
import { AddNewGoodsModal } from "./AddNewGoodsModal";


export default function GoodsList({ setActiveBus }: { setActiveBus: any }) {
    const [coffeList, setCoffeList] = useState<CoffeInfo[]>([])
    const [id] = getActiveId()
    const [isModalShow, setModalShow] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<any>(null)
    const history = useHistory()

    useEffect(() => {
        setActiveBus(id)
        if (id !== -1) {
            getCoffes(id).then((response) => {
                setCoffeList(response.data)
            })
        }
    }, [id])

    const addGoods = (value: CoffeInfo) => {
        if (activeItem) {
            const sameIndex = coffeList.findIndex(item => item.id === value.id)
            if (sameIndex > -1) {
                const listCopy = [...coffeList]
                listCopy.splice(sameIndex, 1, value)
                setCoffeList(listCopy)
            }

        } else {
            setCoffeList([value, ...coffeList])
        }
    }
    return (
        <div>
            <div className={style.orderBox}>
                {coffeList.map(item => (
                    <li className={style.orderItem} key={item.id} onClick={() => {
                        setActiveItem(item)
                        setModalShow(true)
                    }}>
                        <img src={item.thumb} width='80' height='80' />
                        <section>
                            <h4 className='f14 cbbb'>{item.name}</h4>
                            <p>月售{item.monthSell}</p>
                            <p>价格：￥{Number(item.price).toFixed(2)}</p>
                            <p>可用积分：{item.canUsePoints}</p>
                        </section>
                    </li>
                ))}
            </div>
            <AddNewGoodsModal visible={isModalShow} setVisible={setModalShow} addGoods={addGoods} item={activeItem} />
        </div>
    )
}