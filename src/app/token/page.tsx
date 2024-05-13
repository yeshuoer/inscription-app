import { log } from "@/libs";
import { fetchTokens } from "@/libs/api";
import { useEffect, useState } from "react";
import {formatDistanceToNow} from 'date-fns'
import { Deploy } from "./Deploy";

interface IToken {
  tick: string;
  created_at: number;
  progress: number;
  holders: number;
  trxs: number;
  max: number;
}

export default async function TokenPage() {
  const data = await fetchTokens()
  const list: IToken[] = data.data

  return <div>
    <div className="flex justify-between items-center mb-6">
      <div className="text-primary font-bold text-xl">The full list of tokens</div>
      <Deploy />
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>Token</th>
          <th>Deploy Time</th>
          <th>Progress</th>
          <th>Holders</th>
          <th>Transactions</th>
        </tr>
      </thead>

      <tbody>
        {
          list.map((item: IToken, index: number) => {
            return <tr key={item.tick}>
              <td className="text-primary font-bold italic text-l">{item.tick}</td>
              <td>{formatDistanceToNow(item.created_at * 1000)}</td>
              <td>
                <progress className="progress progress-primary w-56" value={item.progress} max={200}></progress>
                {/* <progress className="progress progress-primary w-56" value={item.progress} max={item.max}></progress> */}
              </td>
              <td>{item.holders}</td>
              <td>{item.trxs}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>;
}
