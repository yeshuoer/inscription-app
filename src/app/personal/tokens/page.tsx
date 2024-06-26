'use client'

import { formatDistanceToNow } from 'date-fns';
import { log } from "@/libs";
import { fetchAddress } from "@/libs/api";
import { Transfer } from './Tansfer'
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { List } from './List';
import Loading from '@/components/Loading';

interface ListItem {
  tick: string;
  amt: number;
}

export default function PersonalInscriptionsPage() {
  const {address, isConnected} = useAccount()
  const [list, setList] = useState<ListItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    init()
  }, [address, isConnected])

  const init = async () => {
    if (isConnected && address) {
      setLoading(true)
      const data = await fetchAddress(address)
      setList(data.data)
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (list.length === 0) {
    return <p className='text-center'>No data</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-between">
      {list.map((item: ListItem, index) => {
        return (
          <div key={item.tick} className="card bg-secondary bg-opacity-85 shadow-xl min-w-56 ring-base-100">
            <div className="card-body w-full h-70 p-0">
              <div className='px-6 py-4'>
                <p className='badge p-3 text-primary'>{item.tick}</p>
                <p className='w-full text-center my-8 text-3xl font-bold text-base-100'>{item.amt}</p>
              </div>

              <div className="bg-base-100 grid grid-cols-2 justify-between rounded-bl-2xl rounded-br-2xl py-4 px-4">
                <Transfer tick={item.tick} amt={item.amt} />
                <List tick={item.tick} amt={item.amt} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
