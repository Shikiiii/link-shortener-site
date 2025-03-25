import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const refresh_token = body.refresh_token;

    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/token/refresh/`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: refresh_token
        }),
    });

    const status = response.status;
    const data = await response.json();
    return NextResponse.json({
        status: status,
        data: data
    })
}