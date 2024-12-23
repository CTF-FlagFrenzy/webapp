import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/teams/`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
            
        return jsonResponse(data, response.status);
    } catch (err) {
        return jsonResponse({ message: "An error occurred", error: err.message }, 500);
    }
}
export async function DELETE({ url }) {
    const id = url.searchParams.get('id');
    const userId = url.searchParams.get('userId')
    console.log(userId)
    if (!id) {
        return jsonResponse({ message: "Team ID is required" }, 400);
    }

    try {
        const response = await fetch(`http://api:8000/teams/${id}/${userId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return jsonResponse({ message: "Team deleted successfully" }, 200);
        } else {
            return jsonResponse({ message: "Failed to delete team" }, response.status);
        }
    } catch (error) {
        return jsonResponse({ message: "An error occurred", error }, 500);
    }
}

export async function POST({ request }) {
    const { Password, Teamname} = await request.json();

    try {
        const response = await fetch(`${API_BASE_URL}/teams`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Teamname: Teamname,
                Password: Password
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
