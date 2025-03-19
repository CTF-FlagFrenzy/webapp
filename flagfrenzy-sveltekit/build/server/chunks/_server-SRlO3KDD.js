import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function GET({ url }) {
  const id = url.searchParams.get("id");
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/hints/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hints");
    }
    const data = await response.json();
    return jsonResponse(data, response.status);
  } catch (err) {
    return jsonResponse({ message: "An error occurred", error: err.message }, 500);
  }
}
function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { GET };
//# sourceMappingURL=_server-SRlO3KDD.js.map
