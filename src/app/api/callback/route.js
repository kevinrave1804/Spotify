import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
    const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:3000/api/callback';
    const token_url = 'https://accounts.spotify.com/api/token';

    try {
        const response = await fetch(token_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Spotify API error:', errorData);
            return NextResponse.json({ error: 'Failed to fetch access token' }, { status: response.status });
        }

        const data = await response.json();

        if (data.error) {
            console.error('Spotify API error:', data.error);
            return NextResponse.json({ error: data.error }, { status: 400 });
        }

        cookies().set('spotify_access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: data.expires_in
        });

        return NextResponse.redirect(new URL(`/dashboard?auth=success`, request.url));
    } catch (error) {
        console.log('Unexpected error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}