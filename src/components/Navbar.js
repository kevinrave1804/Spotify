"use client"

import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SpotGreenLogo from "@public/Spotify_logo.png"
import Image from 'next/image'
import SearchForm from './SearchForm'
import { useRouter } from 'next/navigation'

export default function Navbar({ onSearch }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Disclosure as="nav" className="bg-black">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Image
                                    alt="Your Company"
                                    src={SpotGreenLogo}
                                    width={200}
                                    height={200}
                                    className="h-8 w-auto"

                                />
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                onClick={() => {
                                    router.push('/dashboard')
                                    setOpen(true)
                                }}
                                className="relative rounded-full bg-[#1ed760] p-1 text-black hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Search</span>
                                <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </Disclosure>
            <SearchForm open={open} setOpen={setOpen} onSearch={onSearch} />
        </>
    )
}
