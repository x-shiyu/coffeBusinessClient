import React, { useState, useEffect } from 'react'
import { DetailHeader } from '../components'
import { useMount, usePersistFn, useRequest } from 'ahooks'
import style from './style.module.css'
import { getCates, CateInfo } from './service'
import { Button, Col, Input, Pagination, Row } from 'antd'
import { Route, useHistory } from 'react-router-dom'
import GoodsList from './GoodsList'
import { allBusiness } from './atoms'
import { useRecoilState } from 'recoil'
import { AddNewCateModal } from './AddNewCateModal'
const PAGESIZE = 10

function CateList({
  list,
  activeBus,
}: {
  list: CateInfo[]
  activeBus: number
}) {
  const history = useHistory()
  return (
    <>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            history.push(`/business/${item.id}`)
          }}
          className={`p10 m10 ${
            activeBus.toString() === item.id.toString() ? 'bgc777' : 'bgc444'
          } radius5 fx pointer`}
        >
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
    if (cates.length > 0) {
      setCates(cates.filter((item) => new RegExp(value).test(item.name)))
      return
    }
    setCurrent(current)
    const data: any = await getCates(current)
    setCates(data)
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
          <CateList list={cates} activeBus={activeBus} />
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
        <Route path="/business/:id">
          <GoodsList setActiveBus={setActiveBus} />
        </Route>
      </div>
    </main>
  )
}
