import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const passwordConfirmation = body.passwordConfirmation;

    const protocol = process.env.DJANGO_API_SECURE_DOMAIN === 'True' ? 'https' : 'http';
    const apiUrl = `${protocol}://${process.env.DJANGO_API_URL}/api/register/`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
        }),
    });
    return response;
}