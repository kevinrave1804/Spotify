"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

function Login() {
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const accesToken = localStorage.getItem('access_token')

        if (!accesToken) {
            router.push("/api/redirect")
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <div className="bg-gradient-to-t from-[#1ed760] to-slate-300 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    alt="Your Company"
                    src={"https://www.logo.wine/a/logo/Spotify/Spotify-Black-Logo.wine.svg"}
                    width={300}
                    height={300}
                    className="mx-auto w-auto h-auto"
                    priority={true}
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
                    Tu música, tu ritmo, tu momento.
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login