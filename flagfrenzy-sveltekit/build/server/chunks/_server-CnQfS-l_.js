import './index-DzcLzHBX.js';

const API_BASE_URL = "http://api:8000";
async function PUT({ request, url }) {
  const id = url.searchParams.get("id");
  const password = url.searchParams.get("password");
  try {
    const response = await fetch(`${API_BASE_URL}/users/leaveteam/${id}?password=${password}`, {
      method: "PUT",
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

export { PUT };
//# sourceMappingURL=_server-CnQfS-l_.js.map
