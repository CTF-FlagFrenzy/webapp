import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/top10`);
    if (!response.ok) {
      throw new Error("Failed to fetch top10 teams");
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
//# sourceMappingURL=_server-BZD1xmGj.js.map
