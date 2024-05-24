'use server'
 
import { cookies } from 'next/headers'
 
export async function DeleteCookie(data: string) {
  cookies().delete(data)
}