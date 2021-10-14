import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from 'react-dom'
import { Button } from "antd";
import { formatCoffeList, FormattedCoffeInfo } from './utils'
import { selectedCoffeNum, addOrderAction, addOrderInfo } from "./atoms";
import { useRecoilState, useRecoilValue } from 'recoil'
import style from './style.module.css'
import { getCoffes, CoffeOrderInfo } from './service'
import { AddAndMin } from './AddAndMin'
import { getActiveId } from './hooks'
import { OrderResultModal } from "./OrderResultModal";

function CoffeOrder({ data }: { data: FormattedCoffeInfo }) {
    function CofferItem({ item }: { item: any }) {
        const [addOrder, setAddOrder] = useRecoilState(addOrderAction(item.id))
        return (
            <li className={style.orderItem} key={item.id}>
                <img src={item.thumb} width='60' height='60' />
                <section>
                    <h4 className='f14 cbbb'>{item.name}</h4>
                    <p>月售{item.monthSell}</p>
                    <p>价格：￥{item.price.toFixed(2)}</p>
                </section>
                <div style={{ position: 'absolute', right: 5, width: 80 }}>
                    <AddAndMin current={addOrder} setCurrent={setAddOrder} />
                </div>
            </li>
        )
    }
    return (
        <div id={data.categoryId as any} className='pt20'>
            <h2 className='ceee' >{data.categoryName}</h2>
            <ul>
                {data.children.map(item => {
                    return (
                        <CofferItem item={item} key={item.id} />
                    )
                })}
            </ul>
        </div>
    )
}
export default function GoodsList({ setActiveBus }: { setActiveBus: any }) {
    const [coffeList, setCoffeList] = useState<CoffeOrderInfo[]>([])
    const selectedNum = useRecoilValue(selectedCoffeNum)
    const [isModalShow, setModalShow] = useState<boolean>(false)
    const [id] = getActiveId()
    useEffect(() => {
        setActiveBus(id)
        if (id !== -1) {
            getCoffes(id).then((response) => {
                setCoffeList(response.data)
            })
        }
    }, [id])

    const coffeListFormatted = useMemo(() => formatCoffeList(coffeList), [coffeList])
    return (
        <div>
            <div>
                <div className='fx-between' style={{ width: 600, margin: '0 auto' }}>
                    <ul style={{ marginTop: 40 }}>
                        {coffeListFormatted.map(item => (<li className='pt10' key={item.categoryId}>
                            <a href={'#' + item.categoryId}> {item.categoryName}</a>
                        </li>))}
                    </ul>
                    <div className={style.orderBox}>
                        {coffeListFormatted.map(item => <CoffeOrder key={item.categoryId} data={item} />)}
                    </div>
                </div>
            </div>
            {document.getElementById('content_box') ? createPortal((<footer className={style.summaryBox}>
                <div className='cddd fx fx fx-h-center pl20 fx-between pr20' style={{ height: '100%' }}>
                    <span>已选 {selectedNum} </span>
                    <Button disabled={selectedNum === 0} onClick={() => { setModalShow(true) }}>下单</Button>
                </div>
            </footer>), document.getElementById('content_box') as any) : undefined}
            <OrderResultModal visible={isModalShow} setVisible={setModalShow} goods={coffeList} activeBusId={id} />
        </div>
    )
}