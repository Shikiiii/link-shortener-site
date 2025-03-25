import { NextResponse } from 'next/server';

export async function GET(
  request: Request
) {
    const url = new URL(request.url);
    const params = url.pathname.split('/').pop();
  
    if (!params) {
        return NextResponse.json(
        { message: 'Short code is required' },
        { status: 400 }
        );
    }

    try {
        // Forward the request to Django API
        const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
        const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/s/${params}/`;
        const response = await fetch(apiUrl);
        
        const data = await response.json();

        if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json({ originalUrl: data.original_url });
    } catch (error) {
        console.error('Error resolving URL:', error);
        return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
        );
    }
}