import React, { useMemo, useState, useRef } from 'react'
import { useMount, useUnmount } from 'ahooks'
import { getOrders, CoffeOrder } from './services'
import style from './style.module.css'
import { formatDate } from '../../utils'
import { Button, message, Tabs } from 'antd'
import request from '@/request'

const { TabPane } = Tabs
const statusMapName:any={
  1:'待接单',
  2:'进行中',
  3:'已完结',
  4:'已拒绝',
}
function Order({ data, loadList }: { data: CoffeOrder; loadList?: any }) {
  const handleAccept = (isAccept:number) => {
    request
      .put('/order/list/', {
        order_id: data.id,
        accept:isAccept
      })
      .then(() => {
        message.success('操作成功！')
        setTimeout(() => {
          loadList()
        }, 1000)
      })
  }
  return (
    <div className="bgc444">
      <ul className={style.order_list}>
        <li>
          <span>{data?.statusName}</span>
          <div className={style.order_item_head}>
            <img src={`/api/file/fetch?id=${data.thumb}`} alt="" width="80" height="80" />
            <section>
              <p>{data.name}</p>
              <span>创建日期：{formatDate(data.createTime)}</span>
              <p className={style.discount_box}>
                {data.discount?.map((item, index) => (
                  <span key={index}>
                    {item.full}减{item.minus}
                  </span>
                ))}
              </p>
            </section>
          </div>
          <ul className={style.order_detail_list}>
            {data.goodsList.map((good) => (
              <li key={good.name}>
                <img src={`/api/file/fetch?id=${good.thumb}`} alt="" width="60" height="60" />
                <p>{good.name}</p>
              </li>
            ))}
          </ul>
          {data?.status === 1 ? (
            <div className="txc pt10">
              <Button style={{marginRight:"10px"}} onClick={()=>handleAccept(1)}>确定接单</Button>
              <Button onClick={()=>handleAccept(2)}>拒绝接单</Button>
            </div>
          ) : undefined}
        </li>
      </ul>
    </div>
  )
}

export default function OrderedList() {
  const [list, setList] = useState<CoffeOrder[]>([])
  const [activeKey, setactiveKey] = useState<string>('1')
  const timerRef = useRef<any>(null)
  const waitAcceptList = useMemo(() => list.filter(item => item.status === 1), [list])
  const hadAcceptList = useMemo(() => list.filter(item => item.status === 2), [list])
  const overList = useMemo(() => list.filter(item => item.status === 3), [list])
  const refuseList = useMemo(() => list.filter(item => item.status === 4), [list])
  const queryList = (value = '1') => {
    clearTimeout(timerRef.current)
    getOrders().then((list: any[]) => {
      setList(list.map(item=>({
        ...item,
        statusName:statusMapName[item.status]
      })))
      timerRef.current = setTimeout(() => {
        queryList()
      }, 10000)
    })
  }

  const handleChange = (value: string) => {
    setactiveKey(value)
    queryList(activeKey)
  }

  useMount(() => {
    queryList()
  })

  useUnmount(() => {
    clearTimeout(timerRef.current)
  })

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
        width: '100%',
        background: '#444',
      }}
    >
      <h1 className={style.order_head}>订单列表</h1>
      <main className={style.order_box}>
        <Tabs
          activeKey={activeKey}
          centered
          tabBarStyle={{ color: '#ddd' }}
          onChange={handleChange}
        >
          <TabPane tab="待接单" key="1">
            {waitAcceptList.map((item) => (
              <Order key={item.id} data={item} loadList={queryList} />
            ))}
          </TabPane>
          <TabPane tab="已接单" key="2">
            {hadAcceptList.map((item) => (
              <Order key={item.id} data={item} />
            ))}
          </TabPane>
          <TabPane tab="已完结" key="3">
            {overList.map((item) => (
              <Order key={item.id} data={item} />
            ))}
          </TabPane>
          <TabPane tab="已拒绝" key="4">
            {refuseList.map((item) => (
              <Order key={item.id} data={item} />
            ))}
          </TabPane>
        </Tabs>
      </main>
    </div>
  )
}
