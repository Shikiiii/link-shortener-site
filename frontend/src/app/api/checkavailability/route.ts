import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const shortCode = body.shortcode;

    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/checkavailability/`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            shortCode: shortCode,
        }),
    });
    const data = await response.json()
    
    return NextResponse.json({
        status: response.status,
        available: data.available,
    })
}