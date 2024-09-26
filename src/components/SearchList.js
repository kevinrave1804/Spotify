"use client"

import { useRouter } from "next/navigation"

export default function SearchList({ data }) {
    const router = useRouter()


    const detailsHandler = async (id, type) => {
        router.push(`/details?type=${type}&id=${id}`)
    }

    return (
        <ul role="list" className="px-5">
            {data?.tracks?.items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => detailsHandler(item.id, item.type)}
                    className="flex justify-between gap-x-6 py-5 hover:border-2 hover:border-[#1ed760] rounded-md p-2 cursor-pointer">
                    <div className="flex min-w-0 gap-x-4 ">
                        <img alt="" src={item?.album?.images[0].url} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                        <div className="min-w-0 flex-auto ">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{item?.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.artists[0].name}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
