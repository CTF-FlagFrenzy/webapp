import { error } from "@sveltejs/kit";

const API_BASE_URL = 'http://api:8000';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin_panel/`);
        if (!response.ok) {
            throw new Error('Failed to fetch flags');
        }

        // Parse the JSON response
        const data = await response.json();
        
        // Format response if additional handling is needed
        return jsonResponse(data, response.status);
    } catch (err) {
        return jsonResponse({ message: "An error occurred", error: err.message }, 500);
    }
}
export async function POST({ request }) {
    
    const { TeamsID, ChallengeID, Flag} = await request.json();

    try {
        const response = await fetch(`${API_BASE_URL}/submit_flag/${TeamsID}/${ChallengeID}?flag=${Flag}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_id: TeamsID,
                challenge_id: ChallengeID
            })
        });
        const data = await response.json();
        return jsonResponse(data, response.status);
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