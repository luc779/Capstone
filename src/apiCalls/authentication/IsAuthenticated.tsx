'use server'

import { cookies } from 'next/headers'

export async function IsAuthenticated() {
    if (cookies().has('userSub') && cookies().has('accessToken')) {
        return true
    }
    return false   
}
