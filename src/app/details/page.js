"use client"

import DetailsItem from '@/components/DetailsItem';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function DetailsProduct() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!type || !id) {
                setError('Missing type or id parameter');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/spotify-router?endpoint=${type}s/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const data = await response.json();
                setDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [type, id]);

    console.log("Deatils", details);


    return (
        <div className='max-h-screen bg-gradient-to-t from-[#1ed760]   to-black'>
            <Navbar />
            <DetailsItem itemData={details} />
        </div>
    )
}

export default DetailsProduct