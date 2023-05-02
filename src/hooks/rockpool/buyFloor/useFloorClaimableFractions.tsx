import { notification } from 'antd'
import { useCallback, useEffect } from 'react'
import useClaimFractions from '../open-collective-purchaseV2/useClaimFractions'

export default function useFloorClaimFractions(chainId: number, buyer: string, poolId: string, refetchData: () => void) {
  const { claim, isSuccess ,isLoading } = useClaimFractions(chainId, poolId, buyer)

  const claimFractions = async () => {
    try {
      if (!poolId) return
      await claim()
    } catch (_) {
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }

  const notificationSuccessAddFounds = useCallback(() => {
    notification.success({
      message: `Claim fraction successfully`,
      description: `successfully`,
      placement: 'top',
      duration: 2
    })
  }, [])

  useEffect(() => {
    if (isSuccess) {
      refetchData()
      notificationSuccessAddFounds()
    }
   else{
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }, [isSuccess, refetchData, notificationSuccessAddFounds])

  return {
    claimFractions,
    isExecutin: isLoading
  }
}
