import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/challenges/`);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        return jsonResponse(await response.json(), response.status);
    } catch (err) {
        return jsonResponse({ message: "An error occurred", error: err }, 500);
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
