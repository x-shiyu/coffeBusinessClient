import React,{useRef} from 'react'
import style from './index.module.css'
import { useMount } from 'ahooks'
import request from '@/request'
import {
  Chart
} from 'chart.js';


function getMonthConfig(response:any[],type='line',label=''):any{
  const labels:string[] = [];
  const dataArr:number[] = [];
  response.forEach(item=>{
    labels.push(item.label)
    dataArr.push(item.value)
  })
  const data = {
    labels,
    datasets: [{
      label,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataArr,
    }]
  };
  
  return  {
    type,
    data: data,
    options: {}
  }
}
export default function Charts() {
  const monthRef = useRef<any>(null)
  const goodsRef = useRef<any>(null)
  const chartMonth = useRef<any>(null)
  const chartGoods = useRef<any>(null)

  useMount(() => {
    
    const types = ['month','goods'];
    const proArr = types.map(type=>{
      return request.get('/charts/info/',{
        params:{
          type
        }
      })
    })
    Promise.allSettled(proArr).then(([monthRes,goodsRes])=>{
      if(monthRes.status='fulfilled'){
        chartMonth.current = new Chart(monthRef.current,getMonthConfig(monthRes.value,'line','过去一年的销量'))
      }
      if(goodsRes.status='fulfilled'){
        chartGoods.current = new Chart(goodsRef.current,getMonthConfig(goodsRes.value,'bar','过去一个月各商品销量'))
      }
    })
  })
  return (
    <div className={style.box}>
      <div>
        <canvas ref={monthRef} ></canvas>
      </div>
      <div>
        <canvas ref={goodsRef}></canvas>
      </div>
    </div>
  )
}
