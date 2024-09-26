import { NextResponse } from "next/server"

export async function GET(request) {
    const scope = 'user-read-private user-read-email streaming user-library-read'
    const redirect_uri = 'http://localhost:3000/api/callback'
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID

    const authURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}`;

    return NextResponse.redirect(authURL);
}