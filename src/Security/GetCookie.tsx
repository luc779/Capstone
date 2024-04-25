'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string) {
    const resp = cookies().get(name);
    return resp?.value;
}
