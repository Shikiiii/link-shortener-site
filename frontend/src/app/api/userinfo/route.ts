import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { token } = await request.json();
    
        if (!token) {
            return NextResponse.json(
              { message: 'Error: BAD REQUEST' },
              { status: 400 }
            );
          }

        const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
        const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/userdata/`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // use the JWT token for authentication
            }
          })
        const data = await response.json()
        const status = response.status
        return NextResponse.json(
            { data: data },
            { status: status }
        )

      } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    }