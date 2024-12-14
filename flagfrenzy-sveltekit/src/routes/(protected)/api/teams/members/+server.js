import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET({ request, url }) {
    const user_id = url.searchParams.get('user_id');
    try {
        const response = await fetch(`${API_BASE_URL}/teams/members/${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
            
        return jsonResponse(data, response.status);
    } catch (err) {
        return jsonResponse({ message: "An error occurred", error: err.message }, 500);
    }
}


function jsonResponse(data, status) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: {
            "Content-Type": "application/json",
        }
    });
}
