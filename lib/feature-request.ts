const FEATURE_REQUEST_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_FEATURE_REQUEST_WEBHOOK_URL ?? "";

export async function sendFeatureRequestV1({
  title,
  description,
  hasConsent,
  fingerprint,
  notification,
  data,
}: {
  title: string;
  description: string;
  hasConsent: boolean | null;
  fingerprint: string | null;
  notification?: boolean;
  data?: any;
}) {
  console.log("Sending feature request");
  console.log(
    title,
    description,
    data,
    "FEATURE_REQUEST_WEBHOOK_URL",
    FEATURE_REQUEST_WEBHOOK_URL
  );
  if (!FEATURE_REQUEST_WEBHOOK_URL) {
    console.error("Feature request webhook URL not set");
    return;
  }
  fetch(FEATURE_REQUEST_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      description,
      hasConsent,
      fingerprint,
      notification,
      data,
    }),
  })
    .then(async (res) => {
      console.log("Feature request sent");
      const response = await res.json();
      console.log(response);
    })
    .catch((error) => console.error("Error sending feature request:", error));
}
