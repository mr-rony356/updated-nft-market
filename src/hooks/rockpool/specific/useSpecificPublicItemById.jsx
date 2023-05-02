import axios from 'axios'
import { data } from 'jquery'
import { useEffect } from 'react'
import { useState } from 'react'
export const useSpecificPublicItemById = (rockpoolItemId, chainId) => {
  const [loading, setLoading] = useState(true)
  const [noItems, setNoItems] = useState(true)
  const [items, setItems] = useState(
    {
      id:0,
      fractions: 0,
      duration:0,
      priceMultiplier: 0,
      targetPrice: 0,
      status: false,
      progress: 0,
      userParticipation:0,
      isErc721Available: false,
      image: "",
      price: 0,
      fractionsCount: 0,
      reservePrice: 0,
      fee: 0,
      title: "",
      amount: 0,
  }
  )

  const url = `/api/getRockpoolOne`
  useEffect(() => {
    const body = JSON.stringify({
      listingId: rockpoolItemId,
    });
    console.log(body)
    axios
      .get(url,{
        "listingId": "200"
    },{headers: {
        'Content-Type': 'application/json'
      }})
      .then((res) => {
        console.log(res)
        if (res) setItems(res.data);
        else setItems({
          id:0,
          fractions: 0,
          duration:0,
          priceMultiplier: 0,
          targetPrice: 0,
          status: false,
          progress: 0,
          userParticipation:0,
          isErc721Available: false,
          image: "",
          price: 0,
          fractionsCount: 0,
          reservePrice: 0,
          fee: 0,
          title: "",
          amount: 0,
        });
        setLoading(false);
        if (res.data.items?.length === 0) setNoItems(true);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setItems({
          id:0,
    fractions: 0,
    duration:0,
    priceMultiplier: 0,
    targetPrice: 0,
    status: false,
    progress: 0,
    userParticipation:0,
    isErc721Available: false,
    image: "",
    price: 0,
    fractionsCount: 0,
    reservePrice: 0,
    fee: 0,
    title: "",
    amount: 0,
        });
      });
  }, [loading])

  return { loading, items }
}
