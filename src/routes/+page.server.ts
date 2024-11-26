import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    if (locals.user == '') {
        redirect (302, "/login")
    } else {
        return {
          userID: locals.user
        }
    }
}