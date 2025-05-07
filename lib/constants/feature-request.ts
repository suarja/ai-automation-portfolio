const WEBHOOK_URL =
  "https://n8n.jason-suarez.com/webhook/dc76b9c4-9753-435e-9967-00aa1b3c40c8";

export async function sendFeatureRequest(title: string, description: string) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      description,
    }),
  })
    .then()
    .catch((error) => console.error("Error sending feature request:", error));
}
