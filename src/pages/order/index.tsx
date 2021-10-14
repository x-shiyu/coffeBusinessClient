import React, { useState } from 'react'
import { useMount } from 'ahooks'
import { getOrders, CoffeOrder } from './services'
import style from './style.module.css'
import { formatDate } from '../../utils'
function Order({ data }: { data: CoffeOrder }) {
    return (
        <div className='bgc444'>
            <ul className={style.order_list}>
                <li>
                    <span>{data.status}</span>
                    <div className={style.order_item_head}>
                        <img src={data.thumb} alt="" width='80' height='80' />
                        <section>
                            <p>{data.name}</p>
                            <span>创建日期：{formatDate(data.createTime)}</span>
                            <p className={style.discount_box}>
                                {data.discount?.map((item, index) => (
                                    <span key={index}>{item.full}减{item.minus}</span>
                                ))}
                            </p>
                        </section>
                    </div>
                    <ul className={style.order_detail_list}>
                        {data.goodsList.map((good) => (
                            <li key={good.name}>
                                <img src={good.thumb} alt="" width='60' height='60' />
                                <p>{good.name}</p>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}


export default function OrderedList() {
    const [list, setList] = useState<CoffeOrder[]>([])
    useMount(() => {
        getOrders().then(({ list }) => {
            setList(list)
        })
    })

    return (
        <div style={{ height: '100vh', overflow: 'auto', width: '100%', background: '#444' }}>
            <h1 className={style.order_head}>订单列表</h1>
            <main className={style.order_box}>
                {list.map((item) => <Order key={item.id} data={item} />)}
            </main>
        </div>
    )
}


