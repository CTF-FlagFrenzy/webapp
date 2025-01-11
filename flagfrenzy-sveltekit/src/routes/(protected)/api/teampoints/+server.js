import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/teamPoints/`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
            
        return jsonResponse(data, response.status);
    } catch (err) {
        return jsonResponse({ message: "An error occurred", error: err.message }, 500);
    }
}
export async function POST({ request }) {
    const { TeamsID, Points} = await request.json();

    try {
        const response = await fetch(`${API_BASE_URL}/teamPoints`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TeamsID: TeamsID,
                Points: Points
            })
        });

        return jsonResponse(response, response.status);
    } catch (error) {
        return jsonResponse({ message: "An error occurred", error }, 500);
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
