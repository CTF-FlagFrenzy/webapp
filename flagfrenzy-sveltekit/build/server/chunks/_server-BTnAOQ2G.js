import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function POST({ request }) {
  const { user_id, ChallengeID, Flag } = await request.json();
  console.log(user_id);
  try {
    const response = await fetch(`${API_BASE_URL}/validate_flag/${ChallengeID}/${user_id}?flag=${Flag}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        challenge_id: ChallengeID,
        user_id
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

export { POST };
//# sourceMappingURL=_server-BTnAOQ2G.js.map
