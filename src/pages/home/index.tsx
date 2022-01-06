import React, { useState, useEffect } from 'react'
import { DetailHeader } from '../components'
import { useMount, usePersistFn, useRequest } from 'ahooks'
import style from './style.module.css'
import { getCates, CateInfo } from './service'
import { Button, Col, Input, message, Pagination, Row } from 'antd'
import { Route, useHistory } from 'react-router-dom'
import GoodsList from './GoodsList'
import { allBusiness } from './atoms'
import { useRecoilState } from 'recoil'
import { AddNewCateModal } from './AddNewCateModal'
const PAGESIZE = 10
import request from '@/request'
function CateList({
  list,
  activeBus,
  handleDelete
}: {
  list: CateInfo[]
  activeBus: number,
  handleDelete:any
}) {
  const history = useHistory()
  return (
    <>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            history.push(`/cate/${item.id}`)
          }}
          className={`p10 m10 ${
            activeBus.toString() === item.id.toString() ? 'bgc777' : 'bgc444'
          } radius5 fx pointer`}
          style={{position:'relative'}}
        >
           <Button type='primary' size='small' onClick={(ev)=>handleDelete(ev,item.id)} style={{position:'absolute',top:'5px',right:'10px'}}>删除</Button>
          <section className={`ceee pl10 f12`}>
            <h3 className="ceee">{item.name}</h3>
            <p>{item.desc}</p>
          </section>
        </div>
      ))}
    </>
  )
}

export default function Home() {
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [activeBus, setActiveBus] = useState<number>(-1)
  const [cates, setCates] = useState<any[]>([])
  const [isModalShow, setModalShow] = useState<boolean>(false)
  const onAddNewCate = () => {
    setModalShow(true)
  }
  const addCate = (value: any) => {
    setCates([value, ...cates])
  }
  const handleSearch = async (value: string) => {
    setCurrent(current)
    const data: any = await getCates(current,value)
    setCates(data)
  }

  const handleDelete=(ev:any,id:any)=>{
    ev.stopPropagation()
    request.post('/cate/remove/',{
        id
    }).then(()=>{
      message.success('删除成功')
      handleSearch('')
    })
  }


  useMount(() => {
    handleSearch('')
  })

  return (
    <main className={style.contentBox}>
      <div className={style.sideList}>
        <div className="pt20 txc pb20 cddd">咖啡类别</div>
        <div style={{ padding: '20px 10px' }}>
          <Row>
            <Col span={17}>
              <Input.Search placeholder="请输入" onSearch={handleSearch} />
            </Col>
            <Col span={6} offset={1}>
              <Button type="primary" onClick={onAddNewCate}>
                新增
              </Button>
            </Col>
          </Row>
        </div>
        <div className={style.scrollBox}>
          <CateList list={cates} activeBus={activeBus} handleDelete={handleDelete}/>
        </div>
        {/* <div className={style.pageBox} >
                    <Pagination simple total={total} current={current} onChange={(current) => {
                        handleSearch(current)
                    }} />
                </div> */}
        <AddNewCateModal
          visible={isModalShow}
          setVisible={setModalShow}
          addCate={addCate}
        />
      </div>
      <div className={style.goodsBox} id="content_box">
        <DetailHeader title="商品" />
        <Route path="/cate/:id">
          <GoodsList setActiveBus={setActiveBus} />
        </Route>
      </div>
    </main>
  )
}
