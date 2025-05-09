const FEATURE_REQUEST_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_FEATURE_REQUEST_WEBHOOK_URL ?? "";

export async function sendFeatureRequest(title: string, description: string) {
  fetch(FEATURE_REQUEST_WEBHOOK_URL, {
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
