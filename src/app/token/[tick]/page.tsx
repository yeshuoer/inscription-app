import { log } from "@/libs";
import { fetchToken } from "@/libs/api";
import Image from "next/image";
import Link from "next/link";
import { Mint } from "./Mint";
import { formatDistanceToNow } from "date-fns";


export default async function TokenDetialPage({params}: {params: {tick: string}}) {
  log('tick', params.tick)
  const data = await fetchToken(params.tick)
  const detail = data.data
  log('detail', detail)


  return <div className="w-full">
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Link href='/token'>
          <Image src='/arrow-back.svg' width={18} height={18} alt={'token'} />
        </Link>
        <p className="text-primary font-bold italic text-3xl ml-4">{detail.tick}</p>
      </div>
      <Mint />
    </header>

    <div className="flex items-center justify-between mb-12">
      {/* <progress className="progress progress-secondary flex-grow" value={detail.minted} max={detail.max}></progress> */}
      <progress className="progress progress-secondary flex-grow" value={detail.minted} max={3000}></progress>
      <p className="text-secondary text-l w-64 text-right">{detail.minted} / {detail.max}</p>
    </div>

    <div className="card w-full bg-secondary bg-opacity-85 text-base-100 shadow-xl p-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Overview</p>
      </div>
      <hr className="my-6 border-white border-opacity-50" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <p>Inscription ID</p>
          <p>{detail.hash}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Total Supply</p>
          <p>{detail.max}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Minted</p>
          <p>{detail.minted}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Limit Per Mint</p>
          <p>{detail.limit}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Deploy Time</p>
          <p>{formatDistanceToNow(detail.created_at * 1000, { addSuffix: true })}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Holders</p>
          <p>{detail.holders}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p>Total Trasactions</p>
          <p>{detail.trxs}</p>
        </div>
      </div>

    </div>

  </div>
}
