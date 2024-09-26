import React, { useRef, useState } from 'react'

function DetailsItem({ itemData }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-t from-[#1ed760]  to-black shadow-lg rounded-lg overflow-hidden md:max-w-4xl mx-auto">
            <div className="md:flex w-full">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-64 w-full object-cover md:w-64"
                        src={itemData?.album?.images[0].url}
                        alt={itemData?.album?.name}
                    />
                </div>
                <div className="p-8 flex flex-col justify-between w-full">
                    <div>
                        <div className="uppercase tracking-wide text-sm text-[#1ed760] font-semibold">
                            {itemData?.album?.name}
                        </div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                            {itemData?.name}
                        </h1>
                        <p className="mt-2 text-white">
                            {itemData?.artists.map((artist) => (
                                <span key={artist.id}>
                                    {artist.name}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={isPlaying ? handlePause : handlePlay}
                            className="bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="volume" className="text-sm font-semibold text-white">Volume</label>
                        <input
                            type="range"
                            id="volume"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer text-[#1ed760]"
                        />
                    </div>

                    {itemData?.preview_url && (
                        <audio ref={audioRef} src={itemData?.preview_url} className="hidden" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsItem