import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET({ request, url }) {
    const user_id = url.searchParams.get('id');
    const challenge_id = url.searchParams.get('challenge_id');
    try {
        const response = await fetch(`${API_BASE_URL}/user-made-challenges/${user_id}/${challenge_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        // Parse the JSON response
        const data = await response.json();
        
        // Format response if additional handling is needed
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
