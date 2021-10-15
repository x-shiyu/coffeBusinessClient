import React, { useMemo, useState, useRef } from 'react'
import { useMount, useUnmount } from 'ahooks'
import { getOrders, CoffeOrder } from './services'
import style from './style.module.css'
import { formatDate } from '../../utils'
import { Button, message, Tabs } from 'antd'
import request from '@/request'

const { TabPane } = Tabs;
function Order({ data, loadList }: { data: CoffeOrder, loadList?: any }) {
    const handleAccept = () => {
        request.put('/order', {
            id: data.id
        }).then(() => {
            message.success('接单成功！')
            setTimeout(() => {
                loadList()
            }, 1000)
        })
    }
    return (
        <div className='bgc444'>
            <ul className={style.order_list}>
                <li>
                    <span>{data?.statusInfo?.statusName}</span>
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
                    {data?.statusInfo.status === 1 ?
                        <div className='txc pt10'>
                            <Button onClick={handleAccept}>确定接单</Button>
                        </div> : undefined}
                </li>
            </ul>
        </div>
    )
}


export default function OrderedList() {
    const [list, setList] = useState<CoffeOrder[]>([])
    const timerRef = useRef<any>(null)
    const waitAcceptList = useMemo(() => list.filter(item => item.statusInfo.status === 1), [list])
    const hadAcceptList = useMemo(() => list.filter(item => item.statusInfo.status === 2), [list])
    const overList = useMemo(() => list.filter(item => item.statusInfo.status === 3), [list])

    const queryList = () => {
        clearTimeout(timerRef.current)
        getOrders().then(({ list }) => {
            setList(list)
            timerRef.current = setTimeout(() => {
                queryList()
            }, 10000)
        })
    }


    useMount(() => {
        queryList()
    })

    useUnmount(() => {
        clearTimeout(timerRef.current)
    })

    return (
        <div style={{ height: '100vh', overflow: 'auto', width: '100%', background: '#444' }}>
            <h1 className={style.order_head}>订单列表</h1>
            <main className={style.order_box}>
                <Tabs defaultActiveKey="1" centered tabBarStyle={{ color: '#ddd' }}>
                    <TabPane tab="待接单" key="1">
                        {waitAcceptList.map((item) => <Order key={item.id} data={item} loadList={queryList} />)}
                    </TabPane>
                    <TabPane tab="已接单" key="2">
                        {hadAcceptList.map((item) => <Order key={item.id} data={item} />)}
                    </TabPane>
                    <TabPane tab="已完结" key="3">
                        {overList.map((item) => <Order key={item.id} data={item} />)}
                    </TabPane>
                </Tabs>
            </main>
        </div>
    )
}


