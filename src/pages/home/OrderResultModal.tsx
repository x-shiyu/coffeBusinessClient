import React, { useMemo, useEffect, useState } from 'react'
import { Modal, message, Checkbox } from 'antd'
import { useRecoilState } from 'recoil'
import { authInfo } from '../../recoil'
import { addOrderInfo, allBusiness } from './atoms'
import { CoffeOrderInfo, submuitOrder } from './service'
import { usePersistFn } from 'ahooks'
import style from './style.module.css'
import { useHistory } from 'react-router'

interface IOrderResultModalProps {
    visible: boolean,
    setVisible: any,
    goods: CoffeOrderInfo[]
    activeBusId: number
}

function getMaxDiscount(discount: any[], price: number) {
    let maxInfo: any = null
    discount.forEach(item => {
        if (item.full < price) {
            if (maxInfo) {
                maxInfo = maxInfo.full < item.full ? item : maxInfo
            } else {
                maxInfo = item
            }
        }
    })
    return maxInfo
}
export function OrderResultModal({ visible, setVisible, goods, activeBusId }: IOrderResultModalProps) {
    const [userInfo] = useRecoilState(authInfo)
    const [addGoodsInfo, setAddGoods] = useRecoilState(addOrderInfo)
    const [businessList] = useRecoilState(allBusiness)
    const [checked, setChecked] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {
        if (visible) {
            setChecked(false)
        }
    }, [visible])
    const onSubmitOrder = usePersistFn(() => {
        submuitOrder(addGoodsInfo).then(() => {
            message.success('下单成功！')
            setVisible(false)
            setAddGoods({})
            setTimeout(() => {
                history.push('/order')
            }, 1000)
        })
    })

    // 选择的商品
    const selectedGoods = useMemo(() => {
        if (goods) {
            return goods.filter(item => addGoodsInfo[item.id]).map(item => {
                return {
                    ...item,
                    numSelected: addGoodsInfo[item.id],
                    price: addGoodsInfo[item.id] * item.price
                }
            })
        }
        return []
    }, [addGoodsInfo, goods])

    // 商品可以支付的积分
    const canPointPay = useMemo(() => {
        return selectedGoods.reduce((total, current) => total + current.canUsePoints, 0)
    }, [selectedGoods])


    // 可以使用的积分的兑换
    const canUseMoney = useMemo(() => {
        return canPointPay > userInfo.points ? (userInfo.points / 100) : (canPointPay / 100)
    }, [canPointPay, userInfo])

    // 满减的
    const discountInfo = useMemo(() => {
        const totalPay = selectedGoods.reduce((total, current) => total + current.price, 0)
        const activeBusDiscount = businessList.find(item => item.id == activeBusId)
        if (activeBusDiscount && activeBusDiscount.discount) {
            return getMaxDiscount(activeBusDiscount.discount, totalPay)
        }
        return null
    }, [businessList, selectedGoods, visible])

    // 实付的
    const realPay = useMemo(() => {
        const totalPay = selectedGoods.reduce((total, current) => total + current.price, 0)
        if (discountInfo) {
            if (checked) {
                return totalPay - canUseMoney - discountInfo.minus
            } else {
                return totalPay - discountInfo.minus
            }
        } else {
            return checked ? totalPay - canUseMoney : totalPay
        }
    }, [canUseMoney, selectedGoods, checked, discountInfo])

    return (
        <Modal visible={visible} onCancel={() => { setVisible(false) }} onOk={onSubmitOrder} okText='提交' cancelText='取消'>
            <h3 className='txc'>订单详情</h3>
            <ul className={style.modal_list}>
                {selectedGoods.map((item) => (
                    <li key={item.id} >
                        <div className='pr10'>
                            <img src={item.thumb} width='60' height='60' />
                        </div>
                        <div>
                            <p>{item.name}</p>
                            <p>x{item.numSelected}</p>
                        </div>
                        <span>￥{item.price.toFixed(0)}</span>
                    </li>
                ))}
                {userInfo.vip_level > 0 ? (
                    <>
                        {discountInfo ? (<li style={{ justifyContent: 'space-between' }}>
                            <p>使用的满减</p>
                            <p style={{ color: 'goldenrod' }}>{discountInfo ? `满${discountInfo.full}减${discountInfo.minus}` : '不满足满减条件'}</p>
                        </li>) : undefined}
                        <li style={{ justifyContent: 'space-between' }}>
                            <p>积分可兑换</p>
                            <div>
                                <span className='pr10'>{canUseMoney}</span>
                                <Checkbox checked={checked} onChange={(ev) => {
                                    setChecked(ev.target.checked)
                                }} />
                            </div>
                        </li>
                    </>
                ) : undefined}

                <li style={{ justifyContent: 'space-between' }}>
                    <p>实付</p>
                    <p>￥{realPay.toFixed(2)}</p>
                </li>
            </ul>
        </Modal>
    )
}