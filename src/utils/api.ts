import { log } from "."

export const fetchRecords = async (toBlock: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GO_API}/records?fromBlock=1&toBlock=${toBlock}`)
  const data = await res.json()
  data.data = data.data.filter((record: any) => record.block > 0)
  return data
}

export const fetchTokens = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GO_API}/tokens`)
  const data = await res.json()
  return data
}
