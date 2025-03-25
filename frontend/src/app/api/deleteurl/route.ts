import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const token = body.token;
    const shortCode = body.shortcode;

    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/delete/`;
    const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            shortCode: shortCode,
        }),
    });
    
    return NextResponse.json({
        status: response.status
    })
}