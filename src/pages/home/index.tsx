import React, { useState, useEffect } from "react";
import { DetailHeader } from "../components";
import { useMount, usePersistFn, useRequest } from 'ahooks'
import style from './style.module.css'
import { getBusiness, BusinessInfo } from './service'
import { Pagination } from "antd";
import { Route, useHistory } from 'react-router-dom'
import GoodsList from "./GoodsList";
import { allBusiness } from "./atoms";
import { useRecoilState } from "recoil";
const PAGESIZE = 10

function BusinessList({ list, activeBus }: { list: BusinessInfo[], activeBus: number }) {
    const history = useHistory()
    return (
        <>
            {list.map(item => (<div key={item.id} onClick={() => {
                history.push(`/business/${item.id}`)
            }} className={`p10 m10 ${activeBus.toString() === item.id.toString() ? 'bgc777' : 'bgc444'} radius5 fx pointer`}>
                <img src={item.thumb} width={60} height={60} />
                <section className={`ceee pl10 f12`}>
                    <h3 className='ceee'>{item.name}</h3>
                    <p>{item.vote} 月售{item.monthSell}</p>
                    <p>{item.desc}</p>
                </section>
            </div>))}
        </>
    )
}



export default function Home() {
    const [business, setBusiness] = useRecoilState<BusinessInfo[]>(allBusiness)
    const [current, setCurrent] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [activeBus, setActiveBus] = useState<number>(-1)



    const handleSearch = async (current: number) => {
        setCurrent(current)
        const { data } = await getBusiness(current)
        setBusiness(data.list)
        setTotal(data.total)
    }

    useMount(() => {
        handleSearch(1)
    })


    return (
        <main className={style.contentBox}>
            <div className={style.sideList}>
                <div className={style.scrollBox}>
                    <BusinessList list={business} activeBus={activeBus} />
                </div>
                <div className={style.pageBox} >
                    <Pagination simple total={total} current={current} onChange={(current) => {
                        handleSearch(current)
                    }} />
                </div>
            </div>
            <div className={style.goodsBox} id='content_box'>
                <DetailHeader title='商品' />
                <Route path='/business/:id' >
                    <GoodsList setActiveBus={setActiveBus} />
                </Route>
            </div>
        </main>
    )
}