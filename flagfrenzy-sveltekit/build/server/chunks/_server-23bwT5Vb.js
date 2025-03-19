import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin_panel/`);
    if (!response.ok) {
      throw new Error("Failed to fetch flags");
    }
    const data = await response.json();
    return jsonResponse(data, response.status);
  } catch (err) {
    return jsonResponse({ message: "An error occurred", error: err.message }, 500);
  }
}
async function POST({ request }) {
  const { UserID, ChallengeID, Flag } = await request.json();
  try {
    const response = await fetch(`${API_BASE_URL}/submit_flag/${UserID}/${ChallengeID}?flag=${Flag}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: UserID,
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
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { GET, POST };
//# sourceMappingURL=_server-23bwT5Vb.js.map
