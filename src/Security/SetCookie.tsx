'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, input: string) {
    cookies().set(name, input, {
        httpOnly: true,
        maxAge: 24 * 60 * 60, // the cookies are set for 30 days then they expire
        path: '/',
    });
}

