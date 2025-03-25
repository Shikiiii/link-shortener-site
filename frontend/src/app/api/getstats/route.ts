import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/getstats/`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return NextResponse.json(await response.json(), { status: response.status });
}