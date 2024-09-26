import { useState } from 'react';
import { useRouter } from "next/navigation"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

function SearchForm({ open, setOpen, onSearch }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [type, setType] = useState('track');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        router.refresh()
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const endpoint = 'search';
            const queryParams = { q: encodeURIComponent(query), type: type };
            const params = new URLSearchParams({ endpoint, ...queryParams });
            const response = await fetch(`/api/spotify-router?${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            onSearch(result);
            setOpen(false)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={!!open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                            <h1 className="text-2xl font-semibold text-center text-[#1ed760] mb-6">Buscar musica</h1>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for a song, artist or album"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
                                />

                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                                >
                                    <option value="track">Track</option>
                                    <option value="artist">Artist</option>
                                    <option value="album">Album</option>
                                </select>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                >
                                    {loading ? 'Buscando...' : 'Buscar'}
                                </button>

                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className={`w-full py-2 rounded-lg border-2 border-slate-400 text-black font-semibold transition duration-200 ease-in-out transform hover:scale-105`}
                                >
                                    Cancel
                                </button>
                            </form>

                            {error && (
                                <div className="mt-4 text-red-600 text-center">
                                    Intenta buscar otra vez
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

    );
}

export default SearchForm;