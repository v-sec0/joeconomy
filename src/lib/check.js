import { redirect } from '@sveltejs/kit'

export async function checkUser(data) {
    if (!data) {
        redirect(302, '/login')
    } else {
        return {username: data.username, id: data.id}
    }
}