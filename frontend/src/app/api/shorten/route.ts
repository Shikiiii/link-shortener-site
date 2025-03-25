import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { original_url, custom_code = '', token = '' } = await request.json();

    if (!original_url) {
      return NextResponse.json(
        { message: 'URL is required' },
        { status: 400 }
      );
    }

    // Forward the request to your Django API
    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/shorten/`;

    let headers: { 'Content-Type': string; 'Authorization'?: string } = {
      'Content-Type': 'application/json',
    }
    if (token !== '') {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let body: { 'original_url': string; 'custom_code'?: string } = {
      'original_url': original_url
    }
    if (custom_code !== '') {
      body['custom_code'] = custom_code;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Short URL Data: ', data);
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ short_code: data.short_code }, { status: 201 });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}