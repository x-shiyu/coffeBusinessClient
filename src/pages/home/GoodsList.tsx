import React, { useState, useEffect, useMemo } from 'react'
import style from './style.module.css'
import { CoffeInfo, getCoffes } from './service'
import { getActiveId } from './hooks'
import { useHistory, useParams } from 'react-router'
import { AddNewGoodsModal } from './AddNewGoodsModal'
import { Button, Col, Input, message, Row } from 'antd'
import request from '@/request'
export default function GoodsList({ setActiveBus }: { setActiveBus: any }) {
  const [coffeList, setCoffeList] = useState<CoffeInfo[]>([])
  const [id] = getActiveId()
  const [isModalShow, setModalShow] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<any>(null)
  const { id:cateId } = useParams<{ id: string }>()
  const handleSearch = (keyword:string)=>{
    getCoffes(id,keyword).then((response:any[]) => {
      setCoffeList(response.map(item=>({
        ...item,
        thumb:{
          file_id:item.thumb_id
        },
        thumb_url:`/api/file/fetch?id=${item.thumb_id}`,
      })))
    })
  }
  useEffect(() => {
    setActiveBus(id)
    if (id !== -1) {
      handleSearch('')
    }
  }, [id])

  const addGoods = (value: CoffeInfo,isUpdate=false) => {
    if (isUpdate) {
      const sameIndex = coffeList.findIndex((item) => item.id === value.id)
      if (sameIndex > -1) {
        const listCopy = [...coffeList]
        listCopy.splice(sameIndex, 1, value)
        setCoffeList(listCopy)
      }
    } else {
      setCoffeList([value, ...coffeList])
    }
  }
  const hanldeDelete = (ev:any,id:any)=>{
    ev.stopPropagation()
    request.post('/goods/delete/',{
      id
    }).then(()=>{
      message.success('删除成功')
      handleSearch('')
    })
  }

  return (
    <div>
      <div className={style.orderBox}>
        <Row className="pt20">
          <Col span={18}>
            <Input.Search onSearch={handleSearch} placeholder="请输入" />
          </Col>

          <Col span={4} offset={2}>
            <Button
              type="primary"
              onClick={() => {
                setActiveItem(null)
                setModalShow(true)
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
        <ul>
          {coffeList.map((item) => (
            <li
              className={style.orderItem}
              key={item.id}
              onClick={() => {
                setActiveItem(item)
                setModalShow(true)
              }}
            >
              <Button onClick={(ev)=>hanldeDelete(ev,item.id)} size='small' type='primary' style={{position:'absolute',top:'20px',right:'20px'}}>删除</Button>
              <img src={item.thumb_url as any} width="80" height="80" />
              <section>
                <h4 className="f14 cbbb">{item.name}</h4>
                <p>月售：{item.month_sell}</p>
                <p>价格：￥{Number(item.price).toFixed(2)}</p>
                <p>折扣：{item.discount/10} 折</p>
              </section>
            </li>
          ))}
        </ul>
      </div>
      <AddNewGoodsModal
        cateId={cateId}
        visible={isModalShow}
        setVisible={setModalShow}
        addGoods={addGoods}
        item={activeItem}
      />
    </div>
  )
}
