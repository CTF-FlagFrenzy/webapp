import { error } from "@sveltejs/kit";

export async function GET({ request, url }) {
    const id = url.searchParams.get('id');
    console.log(id)
    try {
        const response = await fetch(`http://api:8000/users/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
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
