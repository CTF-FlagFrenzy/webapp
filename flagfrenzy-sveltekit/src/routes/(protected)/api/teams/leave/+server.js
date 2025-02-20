import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function PUT({ request, url }) {
    const id = url.searchParams.get('id');
    const { Password, Teamname} = await request.json();

    try {
        const response = await fetch(`${API_BASE_URL}/team/leaveteam/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
