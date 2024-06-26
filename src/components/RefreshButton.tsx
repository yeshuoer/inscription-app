'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * refresh button
 * call router.refresh()
 * @returns 
 */
export function RefreshButton(props: {
  onClick?: Function,
}) {
  const router = useRouter()

  const handleRefresh = () => {
    if (props.onClick) {
      props.onClick()
    } else {
      router.refresh()
    }
  }

  return <button className="flex items-center cursor-pointer" onClick={handleRefresh}>
    <div className="mr-2 text-primary">Refresh</div>
    <Image src="/sync.svg" alt="refresh" width={18} height={18} />
  </button>
}
