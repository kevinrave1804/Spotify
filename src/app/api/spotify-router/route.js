import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

async function spotifyFetch(endpoint, queryParams = {}) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('spotify_access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    console.log(url);

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken.value}`
        }
    });

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'me';

    const queryParams = {};
    for (const [key, value] of searchParams.entries()) {
        if (key !== 'endpoint') {
            queryParams[key] = value;
        }
    }

    try {
        const data = await spotifyFetch(endpoint, queryParams);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}