import { checkUser } from '$lib/check'
export async function load({ locals }) {
    return checkUser(locals.user)
}