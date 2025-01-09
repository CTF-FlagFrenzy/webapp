import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/challenges/`);
        if (!response.ok) {
            throw new Error('Failed to fetch challenges');
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

export async function POST({ request }) {
    const { id, challenge_id, Solved } = await request.json();

    // Here you would add your logic to handle the flag submission
    // For example, you might call your FastAPI backend to save the submission

    // Example response data
    const data = {
        status: 'success',
        message: 'Flag submitted successfully',
        id,
        challenge_id,
        Solved
    };

    return json(data, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        }
    });
}