'use server'

import { cookies } from 'next/headers'

export async function IsAuthenticated() {
    if (cookies().has('accessToken')) {
        return true
    }
    return false   
}
