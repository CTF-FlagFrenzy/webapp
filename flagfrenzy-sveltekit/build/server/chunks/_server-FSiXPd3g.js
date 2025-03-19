import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function GET({ url }) {
  const user_id = url.searchParams.get("user_id");
  const challenge_id = url.searchParams.get("challenge_id");
  try {
    const response = await fetch(`${API_BASE_URL}/deploy/${user_id}/${challenge_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch teams");
    }
    const data = await response.json();
    return jsonResponse(data, response.status);
  } catch (err) {
    return jsonResponse({ message: "An error occurred", error: err.message }, 500);
  }
}
async function POST({ request }) {
  const { UserID, ChallengeID } = await request.json();
  try {
    const response = await fetch(`${API_BASE_URL}/deprovision/${UserID}/${ChallengeID}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    return jsonResponse(response, response.status);
  } catch (error) {
    return jsonResponse({ message: "An error occurred", error }, 500);
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

export { GET, POST };
//# sourceMappingURL=_server-FSiXPd3g.js.map
