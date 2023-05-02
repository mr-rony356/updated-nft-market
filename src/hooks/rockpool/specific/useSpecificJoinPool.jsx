import { notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { chainConfig } from '../../ChainConfig'
import useJoin from '../open-collective-purchase/useJoin'

export default function useSpecificJoinPool(
  chainId,
  accountAddress,
  specificPoolItem,
  value,
  reserveAmount,
) {

  const { join, isSuccess,isLoading } = useJoin(chainId, specificPoolItem, value,reserveAmount)
  const handleJoin = async () => {
   

    try {
    console.log(chainId, specificPoolItem, value)

      await join()
    } catch (err) {
      console.log(err)
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }

  const notificationSuccessAddFounds = useCallback(() => {
    notification.success({
      message: `Funds successfully added!`,
      description: `Amount deposited: ${value} ETH`,
      placement: 'top',
      duration: 2
    })
  }, [value])

  useEffect(() => {
    if (isSuccess) {
      notificationSuccessAddFounds()
    }
  }, [notificationSuccessAddFounds, isSuccess])

  return {
    handleJoin,
    isExecutin: isLoading
  }
}
